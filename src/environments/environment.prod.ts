export const environment = {
  production: false,
  vestingContractAddress: '0x014aD207Ad0deFbc6992f5F421263F4A4c223cb6',
  coinAddress: '0x4F9E014f620D83b08342C8BDFf3043fb2220b727',
  coinSymbol: 'QONE',
  supabaseRestUrl: 'https://uvqnyufffifclezqkmzh.supabase.co/functions/v1/proof-by-address',
  walletConnectProjectId: '051e4ff495bf3f36a63792e87bf4ba7e',
  networkDetails: {
    chainId: '0x3E7',
    chainName: 'Hyperliquid TestNet',
    nativeCurrency: {
      name: 'HYPE',
      symbol: 'HYPE',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.hyperliquid.xyz/evm'],
    blockExplorerUrls: ['https://testnet.purrsec.com/'],
  }
};

