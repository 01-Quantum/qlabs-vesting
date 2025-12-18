export const environment = {
  production: false,
  vestingContractAddress: '0x6089cdFC15A0F71Bcbb1c54FA9F0D8d3FEe235fB',
  coinAddress: '0x9ad49fC9Cb2a998ed2De48CFb6DE81bf9Ce1ea3C',
  supabaseRestUrl: 'https://uvqnyufffifclezqkmzh.supabase.co/functions/v1/proof-by-address',
  networkDetails: {
    chainId: '0x3E6',
    chainName: 'Hyperliquid TestNet',
    nativeCurrency: {
      name: 'HYPE',
      symbol: 'HYPE',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.hyperliquid-testnet.xyz/evm'],
    blockExplorerUrls: ['https://testnet.purrsec.com/'],
  }
};

