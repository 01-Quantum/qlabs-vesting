// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TokenVesting (per-schedule Merkle, self-claim only)
 * @notice Vesting for QLABS with TGE, cliff, linear vesting; each schedule has its own Merkle root.
 *         No batch initialization or batch claim — investors initialize and claim themselves.
 *
 * Schedules (defaults):
 * 0 - Token Sale Tier 1: 15% TGE, 3mo cliff, 9mo vest
 * 1 - Token Sale Tier 2: 15% TGE, 0mo cliff, 12mo vest
 * 2 - Token Sale Tier 3: 100% TGE, 0mo cliff, 0mo vest
 * 3 - Team & Advisors:   15%  TGE, 6mo cliff, 24mo vest
 * 4 - Liquidity/Treasury:35% TGE, 0mo cliff, 36mo vest
 * 5 - Community Airdrops:5% TGE, 0mo cliff, 24mo vest
 */
contract TokenVesting is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ---- Custom Errors ----
    error InvalidCategory();
    error InvalidToken();
    // error TGEInPast();
    error InvalidMerkleRoot();
    // error CannotChangeAfterTGE();
    error InvalidAmount();
    error AlreadyInitialized();
    error InvalidProof();
    error NothingToClaim();
    error TGEStarted();
    error NoExcessTokens();
    error InvalidState();

    struct VestingSchedule {
        uint256 tgePercent;      // basis points (e.g., 1500 = 15%)
        uint256 cliffDuration;   // seconds
        uint256 vestingDuration; // seconds (linear after cliff)
    }

    struct Allocation {
        uint256 totalAmount;     // total allocated for (beneficiary, category)
        uint256 claimedAmount;   // cumulatively claimed
        bool initialized;
    }

    // ---- Immutable config ----
    IERC20  public immutable token;
    uint256 public immutable tgeTimestamp;

    // ---- Per-category config ----
    mapping(uint8 => VestingSchedule) public vestingSchedules; // category => schedule
    mapping(uint8 => bytes32)         public merkleRoots;      // category => merkle root

    // ---- Per-beneficiary, per-category allocation ----
    mapping(address => mapping(uint8 => Allocation)) public allocations;

    // ---- Accounting ----
    uint256 public totalAllocated;
    uint256 public totalClaimed;

    // ---- Events ----
    event MerkleRootUpdated(uint8 indexed category, bytes32 indexed newRoot);
    event AllocationInitialized(address indexed beneficiary, uint8 indexed category, uint256 amount);
    event TokensClaimed(address indexed beneficiary, uint8 indexed category, uint256 amount);
    event EmergencyWithdraw(address indexed owner, uint256 amount);
    event ExcessWithdrawn(address indexed owner, uint256 amount);

    // ---- Modifiers ----
    modifier validCategory(uint8 category) {
        if (category > 5) revert InvalidCategory();
        _;
    }

    constructor(
        address _token,
        uint256 _tgeTimestamp,
        address initialOwner
    ) Ownable(initialOwner) {
        if (_token == address(0)) revert InvalidToken();
        // if (_tgeTimestamp < block.timestamp) revert TGEInPast();

        token = IERC20(_token);
        tgeTimestamp = _tgeTimestamp;

        // defaults (match your table)
        vestingSchedules[0] = VestingSchedule({ tgePercent: 1500,  cliffDuration: 90 days,  vestingDuration: 270 days });
        vestingSchedules[1] = VestingSchedule({ tgePercent: 1500,  cliffDuration: 0,        vestingDuration: 365 days });
        vestingSchedules[2] = VestingSchedule({ tgePercent: 10000, cliffDuration: 0,        vestingDuration: 0 });
        vestingSchedules[3] = VestingSchedule({ tgePercent: 1500,  cliffDuration: 180 days, vestingDuration: 730 days });
        vestingSchedules[4] = VestingSchedule({ tgePercent: 3500,  cliffDuration: 0,        vestingDuration: 1095 days });
        vestingSchedules[5] = VestingSchedule({ tgePercent: 500,   cliffDuration: 0,        vestingDuration: 730 days });
    }

    // ----------------- Admin -----------------

    function setMerkleRoot(uint8 category, bytes32 newRoot) external onlyOwner validCategory(category) {
        // todo: discuss this point
        //if (block.timestamp >= tgeTimestamp) revert CannotChangeAfterTGE();
        if (newRoot == bytes32(0)) revert InvalidMerkleRoot();
        
        merkleRoots[category] = newRoot;
        emit MerkleRootUpdated(category, newRoot);
    }

    // ----------------- Initialization (self) -----------------

    /**
     * @notice Initialize caller's allocation for a specific category using that category's Merkle root.
     * @dev Leaf: keccak256(abi.encode(beneficiary, totalAmount, category))
     * @param totalAmount Full allocation assigned to msg.sender in this category
     * @param category    Vesting category (0..5)
     * @param proof       Merkle proof against merkleRoots[category]
     */
    function initializeMyAllocation(
        uint256 totalAmount,
        uint8 category,
        bytes32[] calldata proof
    ) external validCategory(category) {
        if (totalAmount == 0) revert InvalidAmount();

        Allocation storage a = allocations[msg.sender][category];
        if (a.initialized) revert AlreadyInitialized();

        bytes32 leaf = keccak256(abi.encode(msg.sender, totalAmount, category));
        if (!MerkleProof.verify(proof, merkleRoots[category], leaf)) revert InvalidProof();

        a.totalAmount   = totalAmount;
        a.claimedAmount = 0;
        a.initialized   = true;

        totalAllocated += totalAmount;

        emit AllocationInitialized(msg.sender, category, totalAmount);
    }

    // ----------------- Claiming (self) -----------------

    /**
     * @notice Claim vested tokens for msg.sender in a specific category.
     * @param category The vesting category to claim from (0..5)
     */
    function claim(uint8 category) external nonReentrant validCategory(category) {
        uint256 amt = getClaimableAmount(msg.sender, category);
        if (amt == 0) revert NothingToClaim();

        allocations[msg.sender][category].claimedAmount += amt;
        totalClaimed += amt;

        token.safeTransfer(msg.sender, amt);
        emit TokensClaimed(msg.sender, category, amt);
    }

    // ----------------- Views -----------------

    function getClaimableAmount(address beneficiary, uint8 category) public view returns (uint256) {
        uint256 vested = getVestedAmount(beneficiary, category);
        uint256 claimed = allocations[beneficiary][category].claimedAmount;
        if (vested <= claimed) return 0;
        return vested - claimed;
    }

    function getVestedAmount(address beneficiary, uint8 category) public view returns (uint256) {
        Allocation memory a = allocations[beneficiary][category];
        if (!a.initialized || block.timestamp < tgeTimestamp) return 0;

        VestingSchedule memory s = vestingSchedules[category];

        // TGE portion
        uint256 tgeUnlock = (a.totalAmount * s.tgePercent) / 10_000;

        // before cliff: only TGE is vested
        uint256 cliffEnd = tgeTimestamp + s.cliffDuration;
        if (block.timestamp < cliffEnd) return tgeUnlock;

        // after cliff: linear vesting of the remainder
        uint256 vestingEnd   = cliffEnd + s.vestingDuration;
        uint256 vestingPool  = a.totalAmount - tgeUnlock;

        if (block.timestamp >= vestingEnd) return a.totalAmount;

        // Safety check (though logic above technically prevents reaching here if duration is 0)
        if (s.vestingDuration == 0) return a.totalAmount; 

        uint256 timeVested = block.timestamp - cliffEnd;
        uint256 linear     = (vestingPool * timeVested) / s.vestingDuration;
        return tgeUnlock + linear;
    }

    function getAllocation(address beneficiary, uint8 category) external view returns (Allocation memory) {
        return allocations[beneficiary][category];
    }

    function getVestingSchedule(uint8 category) external view validCategory(category) returns (VestingSchedule memory) {
        return vestingSchedules[category];
    }

    // ----------------- Owner withdrawals -----------------

    /**
     * @notice Emergency withdraw before TGE (e.g., if deployment must be cancelled).
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        if (block.timestamp >= tgeTimestamp) revert TGEStarted();
        
        token.safeTransfer(owner(), amount);
        emit EmergencyWithdraw(owner(), amount);
    }

    /**
     * @notice Withdraw excess tokens (balance beyond remaining unclaimed allocations).
     */
    function withdrawExcess() external onlyOwner {
        if (totalAllocated < totalClaimed) revert InvalidState();
        
        uint256 balance   = token.balanceOf(address(this));
        uint256 remaining = totalAllocated - totalClaimed; // tokens still owed across all allocations
        
        if (balance <= remaining) revert NoExcessTokens();
        
        uint256 excess = balance - remaining;
        token.safeTransfer(owner(), excess);
        emit ExcessWithdrawn(owner(), excess);
    }
}
