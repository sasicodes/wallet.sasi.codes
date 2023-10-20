import { create } from 'zustand'
import { Chain, WalletData } from '../helpers/types'
import { HDNodeWallet, Mnemonic, randomBytes } from 'ethers'
import { getCurrentChainInfo } from '../helpers/providers'
import { persist } from 'zustand/middleware'

export interface ContextType {
  generateNewWallet: () => WalletData
  selectedAccount: WalletData | null
  setSelectedAccount: (wallet: WalletData) => void
  selectedNetwork: Chain
  setSelectedNetwork: (chain: Chain) => void
}

const useStore = create(
  persist<ContextType>(
    (set) => ({
      selectedNetwork: getCurrentChainInfo(1),
      selectedAccount: null,
      setSelectedNetwork: (chain) => {
        set({ selectedNetwork: chain })
      },
      generateNewWallet: () => {
        const entropy = randomBytes(32)
        // This will generate a random 24 word mnemonic phrase
        const mnemonicPhrase = Mnemonic.fromEntropy(entropy)
        let randomWallet = HDNodeWallet.fromMnemonic(mnemonicPhrase)
        const wallet: WalletData = {
          address: randomWallet.address,
          privateKey: randomWallet.privateKey,
          mnemonic: mnemonicPhrase.phrase
        }
        set(() => ({
          selectedAccount: wallet
        }))
        return wallet
      },
      setSelectedAccount: (wallet) => {
        set({ selectedAccount: wallet })
      }
    }),
    {
      name: 'data'
    },
  )
)

export default useStore
