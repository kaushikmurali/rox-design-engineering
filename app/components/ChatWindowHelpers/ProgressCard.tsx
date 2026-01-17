"use client"

import { useEffect, useState } from "react"
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

export function ProgressCard({
  phase,
  currentStep,
  totalSteps = 4,
  isCompleted = false,
  onVisualComplete,
}: {
  phase: Phase
  currentStep: number
  totalSteps?: number
  isCompleted?: boolean
  onVisualComplete?: () => void
}) {
    const isBooting = phase === "booting"

    const progressPercent = isBooting
        ? "0%"
        : isCompleted
        ? "100%"
        : `${(currentStep / totalSteps) * 100}%`


    const labelText = isBooting
        ? "Starting now..."
        : isCompleted
        ? "Completed in 2 mins"
        : `Step ${currentStep} of ${totalSteps}`


    const timeLeftText = isBooting
        ? "2 mins left"
        : isCompleted
        ? ""
        : currentStep === 1
        ? "2 mins left"
        : currentStep === 2
        ? "1 min left"
        : currentStep === 3
        ? "30s left"
        : "Almost done"


    const [visualCompleted, setVisualCompleted] = useState(false)
    const paddingBottomClass = visualCompleted ? "pb-3" : "pb-5"

    useEffect(() => {
        if (!isCompleted) return

        const t = setTimeout(() => {
            setVisualCompleted(true)
        }, 1200)

        return () => clearTimeout(t)
    }, [isCompleted])





  return (
    <motion.div
        layout
        transition={{ type: "spring", duration: 0.15, bounce: 0 }}
        className={`flex flex-col gap-y-4 px-4 pt-3 ${paddingBottomClass} rounded-2xl border border-[#1A1A1A]`}
    >

        {/* Header */}
        <div className="flex items-center justify-between text-sm gap-2">
            <Image src="/icons/rox-logomark.svg" alt="Rox" width={20} height={20} />

            <div className="relative flex-1 h-5 overflow-hidden">
                <motion.span
                    key={labelText}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                    className="absolute left-0 text-white"
                >
                    <ShimmeringText
                        text={labelText}
                        duration={1.3}
                        opacity={0.22}
                        shimmer={!visualCompleted}
                    />

                </motion.span>

            </div>

            <span className="text-[#AAAAAA]">{timeLeftText}</span>

            {visualCompleted && (
                <Image
                    src="/icons/arrow-right-01.svg"
                    alt="chevron"
                    width={14}
                    height={14}
                />
            )}
        </div>

        {/* Progress bar */}
        <AnimatePresence initial={false} onExitComplete={() => {onVisualComplete?.()}}>
            {!visualCompleted && (
                    <motion.div
                        key="progress-bar"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 4 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                    >
                        <div className="h-1 rounded-full bg-[#253726]">
                        <motion.div
                            className="h-full rounded-full bg-[#6DBF6F]"
                            animate={{ width: progressPercent }}
                            transition={{ type: "spring", duration: 2, bounce: 0 }}
                        />
                        </div>
                    </motion.div>
            )}
        </AnimatePresence>

    </motion.div>
  )
}

