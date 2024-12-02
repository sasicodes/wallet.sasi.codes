export type WalletData = {
  mnemonic?: string
  privateKey: string
  address: string
}

export type AddEthereumChainParameter = {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency?: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}

export type Chain = {
  id: number
  name: AddEthereumChainParameter['chainName']
  nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
  rpcUrls: AddEthereumChainParameter['rpcUrls']
  blockExplorers?: { name: string; url: string }[]
  testnet?: boolean
}

export type ChainName = 'base' | 'mainnet' | 'polygonMainnet'
