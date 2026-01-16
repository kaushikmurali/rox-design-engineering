"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

type Account = {
  id: string
  name: string
  icon: string
}

const accounts: Account[] = [
  { id: "airbnb", name: "Airbnb", icon: "/icons/airbnb.png" },
  { id: "stripe", name: "Stripe", icon: "/icons/stripe.png" },
  { id: "vercel", name: "Vercel", icon: "/icons/vercel.png" },
]

export function AccountSelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Account>(accounts[1]) // Stripe default
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          flex items-center gap-1.5
          bg-[#1A1A1A] hover:bg-[#222222]
          pl-3 pr-2 py-2
          border-[0.5px] border-white/5
          rounded-lg
          shadow-selector-btn
        "
      >
        <Image
          src={selected.icon}
          alt={selected.name}
          width={16}
          height={16}
          className="rounded-sm"
        />

        <span className="text-sm font-medium text-white">
          {selected.name}
        </span>

        <Image
          src="/icons/arrow-down-01.svg"
          alt="open"
          width={16}
          height={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
            <AccountDropdown
            accounts={accounts}
            selected={selected}
            onSelect={(account) => {
                setSelected(account)
                setOpen(false)
            }}
            />
        )}
        </AnimatePresence>

    </div>
  )
}


type AccountDropdownProps = {
  accounts: Account[]
  selected: Account
  onSelect: (account: Account) => void
}

function AccountDropdown({
  accounts,
  selected,
  onSelect,
}: AccountDropdownProps) {
  return (
    <motion.div
        initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
        transition={{ type: "spring", duration: 0.25, bounce: 0 }}
        className="
            absolute top-full left-0 mt-2
            w-60
            rounded-xl
            bg-[#1A1A1A]
            shadow-dropdown
            overflow-hidden
            z-20
        "
        >

      {/* Search (visual only) */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 text-[#666] text-sm">
          <span>
            <Image
                src="./icons/search-01.svg"
                alt="search"
                width={16}
                height={16}
                />

          </span>
          <span>Search account</span>
        </div>
      </div>

      {/* Separators */}
        <div className="h-px w-full bg-black" />
        <div className="h-px w-full bg-white/5" />

      {/* List */}
      <div className="px-2 py-2 gap-1">
        {accounts.map((account) => {
          const isActive = account.id === selected.id

          return (
            <button
              key={account.id}
              onClick={() => onSelect(account)}
              className={`
                w-full p-2
                flex items-center justify-between
                text-sm
                transition-all duration-150
                hover:bg-[#222222]
                rounded-lg
              `}
            >
              <div className="flex items-center gap-2">
                <img
                  src={account.icon}
                  alt={account.name}
                  width={24}
                  height={24}
                  className="rounded-sm"
                />
                <span className="text-white">{account.name}</span>
              </div>

              {isActive && (
                <span className="text-white">
                    <Image
                        src="./icons/tick-02.svg"
                        alt="check"
                        width={16}
                        height={16}
                        />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
