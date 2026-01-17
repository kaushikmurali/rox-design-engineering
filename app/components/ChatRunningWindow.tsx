"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ShimmeringText } from "./ChatWindowHelpers/ShimmeringText"
import { ActivityStep } from "./ChatWindowHelpers/ActivityStep"
import { ProgressCard } from "./ChatWindowHelpers/ProgressCard"
import { SearchChip } from "./ChatWindowHelpers/SearchChip"

type Phase = "booting" | "working"
type Step = 1 | 2

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

    const [currentStep, setCurrentStep] = useState<Step>(1)

    //Step 1
    const [isStep1Done, setIsStep1Done] = useState(false)
    const [step1ActivityExited, setStep1ActivityExited] = useState(false)
    const [step1DoneVisualComplete, setStep1DoneVisualComplete] = useState(false)

    //Step 2
    const [isStep2Done, setIsStep2Done] = useState(false)
    const [step2ActivityExited, setStep2ActivityExited] = useState(false)

    /* boot → working */
    useEffect(() => {
        if (phase !== "booting") return

        const t = setTimeout(() => {
        setPhase("working")
        }, 1200)

        return () => clearTimeout(t)
    }, [phase])

    /* step 1 lifecycle */
    useEffect(() => {
        if (phase !== "working") return

        const t = setTimeout(() => {
            setIsStep1Done(true)
        }, 1800)

        return () => clearTimeout(t)
    }, [phase])

    // Step 2 lifecycle
    useEffect(() => {
        if (!step1ActivityExited || !step1DoneVisualComplete) return

        const t = setTimeout(() => {
            setIsStep2Done(true)
        }, 2200)

        return () => clearTimeout(t)
    }, [step1ActivityExited, step1DoneVisualComplete])

    const currentProgressStep = step1ActivityExited && step1DoneVisualComplete ? 2 : 1


    return (
        <section className="w-full flex flex-col bg-[#0F0F0F] rounded-xl items-center">
        <div className="w-173">

            {/* User message */}
            <div className="pt-6 px-6 flex justify-end">
            <div className="bg-[#1A1A1A] rounded-xl px-4 py-3 text-white text-sm">
                {prompt}
            </div>
            </div>

            {/* Progress */}
            <div className="w-150 mt-6">
                <ProgressCard
                    phase={phase}
                    currentStep={currentProgressStep}
                />
            </div>

            {/* Activity log */}
            {phase === "working" && (
    <>
        {/* STEP 1 — always rendered once started */}
        <ActivityStep
            isDone={isStep1Done}
            runningIcon="/icons/search-01.svg"
            doneIcon="/icons/checkmark-circle-02.svg"
            runningText="Looking at any recent meetings in past couple days and summarizing findings"
            doneText="Reviewed meetings for 30s"
            onActivityExitComplete={() => setStep1ActivityExited(true)}
            onDoneVisualComplete={() => {
                // tiny intentional pause for breathing room
                setTimeout(() => {
                setStep1DoneVisualComplete(true)
                }, 120)
            }}
        >
        {!isStep1Done && (
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
        )}
        </ActivityStep>

        {/* STEP 2 — appears after step 1 is done */}
        {step1ActivityExited && step1DoneVisualComplete && (
            <ActivityStep
                isDone={isStep2Done}
                runningIcon="/icons/briefcase-02.svg"
                doneIcon="/icons/checkmark-circle-02.svg"
                runningText="Searching my deals and seeing if there has been any activity on the deal"
                doneText="Reviewed deal activity"
                onActivityExitComplete={() => setStep2ActivityExited(true)}
            >
                {!isStep2Done && (
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
                    transition={{ delay: 0.6 }}
                    >
                        Retrieving
                    </motion.div>

                    <div className="flex gap-2 flex-wrap">
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85, type: "spring", bounce: 0 }}
                    >
                        <SearchChip label="Retrieving available deal stages" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, type: "spring", bounce: 0 }}
                    >
                        <SearchChip label="Retrieving deals for Stripe" />
                    </motion.div>
                    </div>
                </motion.div>
                )}
            </ActivityStep>
            )}



    </>
    )}

        </div>
        </section>
    )
    }

