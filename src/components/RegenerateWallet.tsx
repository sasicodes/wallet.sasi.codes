import { RefreshCcw } from 'react-feather'
import useStore from '../store/useStore'

const RegenerateWallet = () => {
  const { generateNewWallet } = useStore()

  const regenerateWallet = () => {
    if (
      window.confirm(
        'Are you sure, want to regenerate a new wallet?\n\nNote: You will lose access to this wallet if you do not back up your private key.'
      )
    ) {
      generateNewWallet()
    }
  }

  return (
    <div className="flex justify-end mt-3 ml-1">
      <button
        onClick={() => regenerateWallet()}
        className="inline-flex items-center space-x-2 text-sm hover:opacity-70"
      >
        <RefreshCcw className="w-4 h-4" />
        <span>Generate new wallet</span>
      </button>
    </div>
  )
}

export default RegenerateWallet
