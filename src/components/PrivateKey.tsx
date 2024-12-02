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
    const pk = selectedAccount?.privateKey || ''
    if (reveal || isCopy) {
      return pk
    }
    return pk.replaceAll(/./g, '• ')
  }

  return (
    <div className="px-4 py-5 my-10 space-y-4 bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Private Key</h1>
        <button
          type="button"
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
          type="button"
          onClick={async () => {
            await copy(getPrivateKey(true))
            toast.success('Private key copied 🎉')
          }}
          className="w-full px-4 py-2 tracking-wide break-all text-left line-clamp-2 bg-gray-100 rounded-lg outline-none"
        >
          {getPrivateKey()}
        </button>
      </div>
    </div>
  )
}

export default PrivateKey
