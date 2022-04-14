import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import useStore from '../store/useStore'
import QRCode from './QrCode'

export default function Transact() {
  const { selectedAccount } = useStore()

  if (!selectedAccount) {
    return <div className="grid place-items-center">Loading...</div>
  }

  return (
    <div className="w-full px-2 my-10 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          <Tab
            className={({ selected }) =>
              clsx(
                'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg focus:outline-none',
                selected ? 'bg-gray-900' : 'hover:bg-gray-900'
              )
            }
          >
            Send
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg focus:outline-none',
                selected ? 'bg-gray-900' : 'hover:bg-gray-900'
              )
            }
          >
            Receive
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={clsx('bg-gray-900 rounded-xl p-3 focus:outline-none')}
          >
            sdfs
          </Tab.Panel>
          <Tab.Panel
            className={clsx('bg-gray-900 rounded-xl p-3 focus:outline-none')}
          >
            <div className="flex justify-center p-5">
              <QRCode address={selectedAccount!.address} />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
