import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Check, ChevronDown } from 'react-feather'
import { allChains } from '../helpers/providers'
import useStore from '../store/useStore'
import { Chain } from '../helpers/types'

export default function NetworkSelect() {
  const { setSelectedNetwork, selectedNetwork } = useStore()

  return (
    <>
      <Listbox
        value={selectedNetwork}
        onChange={(v: Chain) => setSelectedNetwork(v)}
      >
        <div className="relative">
          <Listbox.Button className="relative w-full py-1 pl-3 pr-10 text-left rounded-lg cursor-default focus:outline-none sm:text-sm">
            <span className="block truncate">{selectedNetwork?.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute right-0 py-1 mt-1 overflow-auto bg-gray-900 rounded-lg w-44 focus:outline-none sm:text-sm">
              {allChains.map((chain, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `cursor-default select-none relative py-1 pr-10 pl-3 ${
                      active ? 'bg-gray-800' : 'text-gray-400'
                    }`
                  }
                  value={chain}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-semibold text-white' : 'font-normal'
                        }`}
                      >
                        {chain.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-amber-600">
                          <Check className="w-4 h-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  )
}
