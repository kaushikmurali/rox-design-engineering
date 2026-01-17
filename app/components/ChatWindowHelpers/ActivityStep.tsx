"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

const fadeUpBlur = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -6 },
}

const connectorVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.6, duration: 0.2, bounce: 0 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, bounce: 0 },
  },
}

export function ActivityStep({
  isDone,
  runningIcon,
  doneIcon,
  runningText,
  doneText,
  showConnector = true,
  children,
  onActivityExitComplete,
  onDoneVisualComplete
}: {
  isDone: boolean
  runningIcon: string
  doneIcon: string
  runningText: string
  doneText: string
  showConnector?: boolean
  children?: React.ReactNode
  onActivityExitComplete?: () => void
  onDoneVisualComplete?: () => void
}) {
  return (
    <div className="flex mt-4 px-4 gap-x-4 items-stretch">

      {/* Icon + connector */}
      <div className="flex flex-col items-center text-sm text-white">
        <AnimatePresence mode="wait">
          {!isDone ? (
            <motion.div
              key="running-icon"
              variants={fadeUpBlur}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              className="pt-0.5"
            >
              <Image src={runningIcon} alt="" width={16} height={16} />
            </motion.div>
          ) : (
            <motion.div
              key="done-icon"
              variants={fadeUpBlur}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", duration: 0.35, bounce: 0 }}
              className="pt-0.5"
            >
              <Image src={doneIcon} alt="" width={16} height={16} />
            </motion.div>
          )}
        </AnimatePresence>

        {showConnector && (
          <AnimatePresence>
            {!isDone && (
              <motion.div
                key="connector"
                className="h-full w-px
                bg-[linear-gradient(to_bottom,rgba(170,170,170,0)_0%,rgba(170,170,170,0.5)_45%,rgba(170,170,170,0)_100%)]"
                variants={connectorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Text + sub-activity */}
      <div className="flex flex-col gap-y-4">
        <AnimatePresence mode="wait">
          {!isDone ? (
            <motion.span
              key="running-text"
              className="text-sm text-[#AAAAAA] font-light"
              variants={fadeUpBlur}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            >
              {runningText}
            </motion.span>
          ) : (
            <motion.span
              key="done-text"
              className="text-sm text-[#AAAAAA] font-light"
              variants={fadeUpBlur}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", duration: 0.35, bounce: 0 }}
              onAnimationComplete={onDoneVisualComplete}
            >
              {doneText}
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence onExitComplete={onActivityExitComplete}>
          {!isDone && children}
        </AnimatePresence>
      </div>
    </div>
  )
}
