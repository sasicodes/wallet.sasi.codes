import Davatar from '@davatar/react'
import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'
import { shortenAddress } from '../helpers/shorten'
import useStore from '../store/useStore'
import { GitHub, RefreshCcw } from 'react-feather'
import Tooltip from './Tooltip'

const Header = () => {
  const { generateNewWallet, selectedAccount } = useStore()
  const [showBlockie, setShowBlockie] = useState(true)

  useEffect(() => {
    if (!selectedAccount) generateNewWallet()
  }, [])

  if (!selectedAccount) {
    return <div className="grid place-items-center">Loading...</div>
  }

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
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center space-x-4">
          <button>
            {showBlockie ? (
              <img
                className="rounded w-9 h-9"
                src={`https://stamp.fyi/avatar/${selectedAccount.address}`}
                alt=""
              />
            ) : (
              <Davatar
                size={40}
                address={selectedAccount?.address}
                generatedAvatarType="jazzicon"
              />
            )}
          </button>
          <CopyToClipboard
            text={selectedAccount.address}
            onCopy={() => toast.success('Address copied 🎉')}
          >
            <h1 className="text-3xl cursor-default">
              <Tooltip content="Click to Copy">
                <span>{shortenAddress(selectedAccount.address)}</span>
              </Tooltip>
            </h1>
          </CopyToClipboard>
        </div>
        <div className="mt-3 ml-1">
          <button
            onClick={() => regenerateWallet()}
            className="inline-flex items-center space-x-2 text-sm hover:opacity-70"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Regenerate</span>
          </button>
        </div>
      </div>
      <div className="flex pt-3 space-x-4">
        <Tooltip placement="bottom" content="Source Code">
          <a
            title="Source Code"
            href="https://github.com/sasicodes/wallet.sasi.codes"
            className="flex items-center"
            target="_blank"
            rel="noreferrer"
          >
            <GitHub className="w-4 h-4" />
          </a>
        </Tooltip>
      </div>
    </div>
  )
}

export default Header
