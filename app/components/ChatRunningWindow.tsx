"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ShimmeringText } from "./ChatWindowHelpers/ShimmeringText"
import { ActivityStep } from "./ChatWindowHelpers/ActivityStep"

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
  exit: {
    opacity: 0,
    y: -6,
  },
}

const connectorVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 0.2,
      bounce: 0,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      bounce: 0,
    },
  },
}


const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 }
}


export function ChatRunningWindow({ prompt }: { prompt: string }) {
  const [phase, setPhase] = useState<Phase>("booting")
  const [isStepDone, setIsStepDone] = useState(false)

    useEffect(() => {
    if (phase !== "working") return

    const t = setTimeout(() => {
        setIsStepDone(true)
    }, 1800) // delay before switching to "done"

    return () => clearTimeout(t)
    }, [phase])


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
          <ActivityStep
            isDone={isStepDone}
            runningIcon="/icons/search-01.svg"
            doneIcon="/icons/checkmark-circle-02.svg"
            runningText="Looking at any recent meetings in past couple days and summarizing findings"
            doneText="Reviewed meetings for 30s"
            >
            <motion.div
                className="flex flex-col gap-y-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", duration: 0.25, bounce: 0 }}
            >
                <motion.div
                className="text-[10px] text-[#888888] font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                >
                Searching
                </motion.div>

                <div className="flex gap-2 flex-wrap">
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, type: "spring", bounce: 0 }}
                    >
                        <SearchChip label="Searching calendar for recent meetings" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.95, type: "spring", bounce: 0 }}
                    >
                        <SearchChip label="Searching over meetings with Stripe" />
                    </motion.div>
                </div>

            </motion.div>
        </ActivityStep>

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
            variants={fadeUpBlur}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              type: "spring",
              duration: 0.20,
              bounce: 0
            }}
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
            transition={{
                type: "spring",
                duration: 2.0,
                bounce: 0
            }}
            />
        </AnimatePresence>
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
