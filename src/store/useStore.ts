import { configurePersist } from 'zustand-persist'
import create from 'zustand'
import { WalletData } from '../helpers/types'
import { ethers } from 'ethers'

const { persist } = configurePersist({
  storage: localStorage
})

export interface ContextType {
  generateNewWallet: () => WalletData
  selectedAccount: WalletData | null
  setSelectedAccount: (wallet: WalletData) => void
}

const useStore = create<ContextType>(
  persist(
    {
      key: 'data'
    },
    (set) => ({
      selectedAccount: null,
      generateNewWallet: () => {
        const entropy = ethers.utils.randomBytes(32)
        // This will generate a random 24 word mnemonic phrase
        const mnemonicPhrase = ethers.utils.entropyToMnemonic(entropy)
        let randomWallet = ethers.Wallet.fromMnemonic(mnemonicPhrase)
        const wallet: WalletData = {
          address: randomWallet.address,
          privateKey: randomWallet.privateKey
        }
        set(() => ({
          selectedAccount: wallet
        }))
        return wallet
      },
      setSelectedAccount: (wallet) => {
        set({ selectedAccount: wallet })
      }
    })
  )
)
export default useStore
