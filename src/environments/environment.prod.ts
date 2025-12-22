export const environment = {
  production: false,
  vestingContractAddress: '0x3B1f928a90AF6Bfbf3672c9ed4267a161bBB947C',
  coinAddress: '0x948716f8592E5fb3036f6e9b0C463BC2ADb0Ce51',
  coinSymbol: 'QONE',
  supabaseRestUrl: 'https://uvqnyufffifclezqkmzh.supabase.co/functions/v1/proof-by-address',
  walletConnectProjectId: '051e4ff495bf3f36a63792e87bf4ba7e',
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
