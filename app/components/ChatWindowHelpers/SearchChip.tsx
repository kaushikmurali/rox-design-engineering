"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function SearchChip({
  label,
  showChevron = false,
}: {
  label: string
  showChevron?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 26,
      }}
      className="px-3 py-2 rounded-lg bg-[#222222] text-xs font-light text-white flex items-center gap-2 border border-[#1A1A1A]"
    >
      <Image
        src="/icons/search-01.svg"
        alt="search"
        width={14}
        height={14}
      />

      {label}

      {showChevron && (
        <Image
          src="/icons/arrow-right-01.svg"
          alt="chevron"
          width={14}
          height={14}
        />
      )}
    </motion.div>
  )
}
