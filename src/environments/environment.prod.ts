export const environment = {
  production: false,
  vestingContractAddress: '0xF0497a44ECE2D5f7f4a442766e4941a8D544A584',
  coinAddress: '0x83A9c9e0dB0f82d91B86f4c3539c28983CDc393f',
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
