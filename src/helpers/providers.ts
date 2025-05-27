import type { Chain, ChainName } from './types'

/**
 * Data from Chainlist
 * @see https://chainlist.org
 */
export const chain: Record<ChainName, Chain> = {
  mainnet: {
    id: 1,
    name: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: [
      'https://rpc.ankr.com/eth',
      'https://eth.llamarpc.com',
      'https://1rpc.io/eth'
    ],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://etherscan.io'
      }
    ]
  },
  polygonMainnet: {
    id: 137,
    name: 'Polygon',
    nativeCurrency: { name: 'Polygon', symbol: 'POL', decimals: 18 },
    rpcUrls: [
      'https://polygon.llamarpc.com',
      'https://1rpc.io/matic',
      'https://rpc.ankr.com/polygon'
    ],
    blockExplorers: [
      {
        name: 'Polygonscan',
        url: 'https://polygonscan.com'
      }
    ]
  },
  base: {
    id: 8453,
    name: 'Base',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: [
      'https://rpc.ankr.com/base',
      'https://base.llamarpc.com',
      'https://1rpc.io/base'
    ],
    blockExplorers: [
      {
        name: 'Basescan',
        url: 'https://basescan.org'
      }
    ]
  }
}

export const allChains: Chain[] = Object.values(chain)

export const getCurrentChainInfo = (chainId: number): Chain => {
  for (const n of allChains) {
    if (n.id === chainId) return n
  }
  return chain.mainnet
}
