import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Eye, EyeOff } from 'react-feather'
import toast from 'react-hot-toast'
import useStore from '../store/useStore'

const Secrets = () => {
  const [reveal, setReveal] = useState(false)
  const { selectedAccount } = useStore()

  const getPrivateKey = () => {
    let pk = selectedAccount?.privateKey || ''
    if (reveal) {
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
        <CopyToClipboard
          onCopy={() => toast.success('Private key copied 🎉')}
          text={getPrivateKey()}
        >
          <button className="w-full px-4 py-2 tracking-wide text-left truncate bg-gray-800 rounded-lg outline-none select-all">
            {getPrivateKey()}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

export default Secrets
