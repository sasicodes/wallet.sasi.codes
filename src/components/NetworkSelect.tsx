import { Fragment } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from '@headlessui/react'
import { Check, ChevronDown } from 'react-feather'
import { allChains } from '../helpers/providers'
import useStore from '../store/useStore'
import type { Chain } from '../helpers/types'
import clsx from 'clsx'

export default function NetworkSelect() {
  const { setSelectedNetwork, selectedNetwork } = useStore()

  return (
    <>
      <Listbox
        value={selectedNetwork}
        onChange={(v: Chain) => setSelectedNetwork(v)}
      >
        <div className="relative">
          <ListboxButton className="relative w-full py-1 pl-3 pr-9 text-left rounded-lg cursor-default focus:outline-none sm:text-sm">
            <span className="block truncate">{selectedNetwork?.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown
                className="w-5 h-5 text-gray-600"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute right-0 py-1 mt-1 overflow-auto bg-white shadow rounded-lg w-44 focus:outline-none sm:text-sm">
              {allChains.map((chain) => (
                <ListboxOption
                  key={chain.id}
                  className={({ selected, focus }) =>
                    clsx(
                      'cursor-default select-none relative py-1 pr-10 pl-3',
                      !selected ? 'text-gray-600' : '',
                      focus ? 'bg-gray-100' : ''
                    )
                  }
                  value={chain}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-semibold text-black' : 'font-normal'
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
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </>
  )
}
