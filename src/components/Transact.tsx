import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import useStore from '../store/useStore'
import QRCode from './QrCode'
import { useState } from 'react'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'

export default function Transact() {
  const [sendForm, setSendForm] = useState({ address: '', amount: '' })
  const [loading, setLoading] = useState(false)
  const { selectedAccount, selectedNetwork } = useStore()

  const provider = new ethers.JsonRpcProvider(selectedNetwork?.rpcUrls[0])
  if (!selectedAccount) {
    return <div className="grid place-items-center">Loading...</div>
  }

  const sendTransaction = async () => {
    if (!sendForm.address.length || !sendForm.amount.length)
      return toast.error('Fill out all fields.')
    try {
      setLoading(true)
      const signer = new ethers.Wallet(selectedAccount.privateKey, provider)
      const receipt = await signer.sendTransaction({
        to: sendForm.address,
        value: ethers.parseEther(sendForm.amount.toString()),
        chainId: BigInt(selectedNetwork?.id)
      })
      setLoading(false)
      console.log('TXN SUCCESS ->>>>> ', receipt)
      console.log(
        'VIEW IN EXPLORER ->>>>> ',
        `${selectedNetwork.blockExplorers?.[0]?.url}/${receipt.hash}`
      )
      toast.success('Done 🎉, check console for transaction details.')
      setSendForm({ address: '', amount: '' })
    } catch (error: unknown) {
      console.log('TXN ERROR ->>>>> ', error)
      toast.error('Failed, check console for errors.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full my-10 sm:px-0">
      <TabGroup>
        <TabList className="flex p-1 space-x-1 bg-white rounded-xl">
          <Tab
            className={({ selected }) =>
              clsx(
                'w-full py-2.5 duration-200 transition ease-in text-sm leading-5 text-black rounded-lg focus:outline-none',
                selected ? 'bg-gray-100' : 'hover:bg-gray-100'
              )
            }
          >
            Send
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                'w-full py-2.5 duration-200 transition ease-in text-sm leading-5 text-black rounded-lg focus:outline-none',
                selected ? 'bg-gray-100' : 'hover:bg-gray-100'
              )
            }
          >
            Receive
          </Tab>
        </TabList>
        <TabPanels className="mt-2 h-56">
          <TabPanel
            className={clsx('bg-white rounded-xl p-3 focus:outline-none')}
          >
            <div className="p-1 space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="address"
                  className="mx-1 mb-1 text-xs font-semibold tracking-wider uppercase opacity-60"
                >
                  Address
                </label>
                <input
                  autoComplete="off"
                  value={sendForm.address}
                  onChange={(e) =>
                    setSendForm({
                      ...sendForm,
                      address: e.target.value
                    })
                  }
                  className="px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
                  type="text"
                  id="address"
                  placeholder="0x..."
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="amount"
                  className="mx-1 mb-1 text-xs font-semibold tracking-wider uppercase opacity-60"
                >
                  Amount
                </label>
                <input
                  autoComplete="off"
                  value={sendForm.amount}
                  onChange={(e) =>
                    setSendForm({
                      ...sendForm,
                      amount: e.target.value
                    })
                  }
                  placeholder="0.0"
                  className="px-4 py-2 tracking-wider bg-gray-100 rounded-lg focus:outline-none"
                  type="number"
                  id="amount"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={loading}
                  className="px-5 py-1.5 rounded-lg hover:bg-gray-900 text-white bg-black"
                  onClick={() => sendTransaction()}
                >
                  {loading ? 'Loading...' : 'Send'}
                </button>
              </div>
            </div>
          </TabPanel>
          <TabPanel
            className={clsx('bg-white rounded-xl p-3 focus:outline-none')}
          >
            <div className="flex justify-center p-6">
              <QRCode address={selectedAccount.address} />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
}
