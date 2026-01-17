"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ShimmeringText } from "./ShimmeringText"

type Phase = "booting" | "working"

const fadeUpBlur = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
}

export function ProgressCard({ phase }: { phase: Phase }) {
  const isBooting = phase === "booting"

  return (
    <div className="flex flex-col gap-y-4 px-4 pt-3 pb-5 rounded-2xl border border-[#1A1A1A]">
      {/* Header */}
      <div className="flex items-center justify-between text-sm gap-2">
        <Image src="/icons/rox-logomark.svg" alt="Rox" width={20} height={20} />

        <div className="relative flex-1 h-5 overflow-hidden">
          <motion.span
            key={phase}
            variants={fadeUpBlur}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring", duration: 0.2, bounce: 0 }}
            className="absolute left-0 text-white"
          >
            <ShimmeringText
              text={isBooting ? "Starting now..." : "Step 1 of 4"}
              duration={1.3}
              opacity={0.22}
            />
          </motion.span>
        </div>

        <span className="text-[#AAAAAA] text-end">2 mins left</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-[#253726] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            className="h-full bg-[#6DBF6F]"
            animate={{ width: isBooting ? "0%" : "25%" }}
            transition={{ type: "spring", duration: 2, bounce: 0 }}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}
