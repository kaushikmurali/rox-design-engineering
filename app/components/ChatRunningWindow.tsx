"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

type Phase = "booting" | "working"

export function ChatRunningWindow({ prompt }: { prompt: string }) {
  const [phase, setPhase] = useState<Phase>("booting")

  useEffect(() => {
    if (phase !== "booting") return

    const t = setTimeout(() => {
      setPhase("working")
    }, 1200)

    return () => clearTimeout(t)
  }, [phase])

  return (
    <section className="w-full flex flex-col bg-[#0F0F0F] rounded-xl items-center">
      <div className="w-173">

        {/* User message bubble */}
        <div className="pt-6 px-6 flex justify-end">
          <div className="bg-[#1A1A1A] rounded-xl px-4 py-3 text-white text-sm">
            {prompt}
          </div>
        </div>

        {/* Progress card */}
        <div className="w-150 mt-6">
          <ProgressCard phase={phase} />
        </div>

        {/* Activity log */}
        {phase === "working" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 22,
            }}
            className="w-150 mt-4 px-4 gap-x-4 items-stretch flex flex-row"
          >
            <div className="flex flex-col items-center text-sm text-white">
              <Image
                src="/icons/search-01.svg"
                alt="search"
                width={16}
                height={16}
              />

                <div 
                    className="h-full w-px
                    bg-[linear-gradient(to_bottom,rgba(170,170,170,0)_0%,rgba(170,170,170,0.5)_45%,rgba(170,170,170,0)_100%)]" 
                />
                </div>

            <div className="flex flex-col gap-y-4">
                <span className="text-sm text-[#AAAAAA] font-light">
                    Looking at any recent meetings in past couple days and summarizing findings
                </span>

                <div className="flex flex-col gap-y-2">
                    <div className="text-[10px] text-[#888888] font-mono">
                    Searching
                    </div>

                    <div className="flex gap-2 flex-wrap">
                    <SearchChip label="Searching calendar for recent meetings" />
                    <SearchChip label="Searching over meetings with Stripe" />
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}



function ProgressCard({ phase }: { phase: Phase }) {
  const isBooting = phase === "booting"

  return (
    <div className="flex flex-col gap-y-4 px-4 pt-3 pb-5 rounded-2xl border border-[#1A1A1A]">

      {/* Header row */}
      <div className="flex items-center justify-between text-sm gap-2">
        <Image src="/icons/rox-logomark.svg" alt="Rox" width={20} height={20} />

        {/* Title */}
        <div className="relative flex-1 h-5 overflow-hidden">
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 24,
            }}
            className="absolute left-0 text-white"
          >
            {isBooting ? "Starting now..." : "Step 1 of 4"}
          </motion.span>
        </div>

        <span className="text-[#AAAAAA] text-end">2 mins left</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-[#253726] overflow-hidden">
        <motion.div
          className="h-full bg-[#6DBF6F]"
          animate={{ width: isBooting ? "0%" : "25%" }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 20,
          }}
        />
      </div>
    </div>
  )
}



function SearchChip({ label }: { label: string }) {
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
    </motion.div>
  )
}
