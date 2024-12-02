import Davatar from '@davatar/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { shortenAddress } from '../helpers/shorten'
import useStore from '../store/useStore'
import { GitHub } from 'react-feather'
import { ethers } from 'ethers'
import NetworkSelect from './NetworkSelect'
import { useCopyToClipboard } from '../helpers/useCopyToClipboard'

const Header = () => {
  const { generateNewWallet, selectedAccount, selectedNetwork } = useStore()
  const [showBlockie, setShowBlockie] = useState(true)
  const [burnerBalance, setBurnerBalance] = useState('0')
  const [copy] = useCopyToClipboard()

  const provider = new ethers.JsonRpcProvider(selectedNetwork?.rpcUrls[0])

  const getBalance = async () => {
    const data = await provider.getBalance(selectedAccount?.address || '')
    setBurnerBalance(ethers.formatUnits(data))
  }

  useEffect(() => {
    getBalance()
  }, [selectedNetwork])

  useEffect(() => {
    if (!selectedAccount) generateNewWallet()
  }, [])

  if (!selectedAccount) {
    return <div className="grid place-items-center">Loading...</div>
  }

  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="hidden md:block"
            onClick={() => setShowBlockie((b) => !b)}
          >
            {showBlockie ? (
              <img
                src={`https://stamp.fyi/avatar/${selectedAccount.address}`}
                className="rounded-full w-9 h-9"
                draggable={false}
                alt=""
              />
            ) : (
              <Davatar
                size={36}
                address={selectedAccount?.address}
                generatedAvatarType="jazzicon"
              />
            )}
          </button>
          <span className="flex flex-col items-start">
            <button
              type="button"
              className="text-2xl outline-none"
              onClick={async () => {
                await copy(selectedAccount.address)
                toast.success('Address copied 🎉')
              }}
            >
              <span>{shortenAddress(selectedAccount.address)}</span>
            </button>
            <span className="h-4 text-xs bg-gray-900 rounded-full">
              {burnerBalance} {selectedNetwork?.nativeCurrency?.symbol}
            </span>
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <NetworkSelect />
        <a
          title="Source Code"
          href="https://github.com/sasicodes/wallet.sasi.codes"
          className="items-center hidden md:flex"
          target="_blank"
          rel="noreferrer"
        >
          <GitHub className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

export default Header
