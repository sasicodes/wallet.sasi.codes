import { useState } from 'react'
import { Eye, EyeOff } from 'react-feather'
import toast from 'react-hot-toast'
import useStore from '../store/useStore'
import { useCopyToClipboard } from '../helpers/useCopyToClipboard'

const PrivateKey = () => {
  const [reveal, setReveal] = useState(false)
  const { selectedAccount } = useStore()
  const [copy] = useCopyToClipboard()

  const getPrivateKey = (isCopy?: boolean) => {
    let pk = selectedAccount?.privateKey || ''
    if (reveal || isCopy) {
      return pk
    }
    return pk.replaceAll(/./g, '• ')
  }

  return (
    <div className="p-4 my-10 space-y-4 bg-gray-900 rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Private Key</h1>
        <button
          onClick={() => setReveal((b) => !b)}
          className="inline-flex items-center space-x-1.5 text-sm hover:opacity-70"
        >
          {reveal ? (
            <EyeOff className="w-3.5 h-3.5" />
          ) : (
            <Eye className="w-3.5 h-3.5" />
          )}
          <span>{reveal ? 'Hide' : 'Show'}</span>
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            await copy(getPrivateKey(true))
            toast.success('Private key copied 🎉')
          }}
          className="w-full px-4 py-2 tracking-wide text-left truncate bg-gray-800 rounded-lg outline-none select-all"
        >
          {getPrivateKey()}
        </button>
      </div>
    </div>
  )
}

export default PrivateKey
