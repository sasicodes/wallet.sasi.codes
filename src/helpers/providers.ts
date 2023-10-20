import { Chain, ChainName } from './types'

/**
 * Data from Chainlist
 * @see https://chainlist.org
 */
export const chain: Record<ChainName, Chain> = {
  mainnet: {
    id: 1,
    name: 'Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: [`https://rpc.ankr.com/eth`],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://etherscan.io'
      }
    ]
  },
  gnosis: {
    id: 100,
    name: 'Gnosis Chain',
    nativeCurrency: { name: 'xDai', symbol: 'xDAI', decimals: 18 },
    rpcUrls: ['https://rpc.gnosischain.com'],
    blockExplorers: [
      {
        name: 'Blockscout',
        url: 'https://blockscout.com'
      }
    ]
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://optimistic.etherscan.io'
      }
    ]
  },
  base: {
    id: 8453,
    name: 'Base',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.ankr.com/base'],
    blockExplorers: [
      {
        name: 'Basescan',
        url: 'https://basescan.org'
      }
    ]
  },
  polygonMainnet: {
    id: 137,
    name: 'Polygon Mainnet',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: [
      'https://polygon-rpc.com',
      'https://rpc-mainnet.matic.network',
      'https://matic-mainnet.chainstacklabs.com',
      'https://rpc-mainnet.maticvigil.com',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet-full-rpc.bwarelabs.com'
    ],
    blockExplorers: [
      {
        name: 'Polygonscan',
        url: 'https://polygonscan.com'
      }
    ]
  },
  polygonTestnetMumbai: {
    id: 80_001,
    name: 'Polygon Mumbai',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: [
      'https://matic-mumbai.chainstacklabs.com',
      'https://rpc-mumbai.maticvigil.com',
      'https://matic-testnet-archive-rpc.bwarelabs.com'
    ],
    blockExplorers: [
      {
        name: 'Polygonscan',
        url: 'https://mumbai.polygonscan.com'
      }
    ],
    testnet: true
  },
  avalanche: {
    id: 43_114,
    name: 'Avalanche Mainnet',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorers: [{ name: 'SnowTrace', url: 'https://snowtrace.io' }],
    testnet: false
  }
}

export const allChains: Chain[] = Object.values(chain)

export const getCurrentChainInfo = (chainId: number): Chain => {
  allChains.forEach((n) => {
    if (n.id === chainId) return n
  })
  return chain.mainnet
}
