"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const REVEAL_ORDER = [
  "title",

  "s1-title",
  "s1-item-1",
  "s1-item-2",
  "s1-sub-1",
  "s1-sub-2",
  "s1-sub-3",

  "s2-title",
  "s2-item-1",
  "s2-item-2",
  "s2-item-3",

  "s3-title",
  "s3-item-1",
  "s3-item-2",

  "next-title",
  "next-item-1",
  "next-item-2",
  "next-item-3",
] as const

const REVEAL_INTERVAL = 120 // ms — tweak for speed

export function AnswerComponent() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= REVEAL_ORDER.length) {
          clearInterval(timer)
          return prev
        }
        return prev + 1
      })
    }, REVEAL_INTERVAL)

    return () => clearInterval(timer)
  }, [])

  function isVisible(key: (typeof REVEAL_ORDER)[number]) {
    return REVEAL_ORDER.indexOf(key) < visibleCount
  }

  return (
    <div className="mt-6 px-6 pb-6 text-[#EDEDED] text-sm leading-relaxed">

      {/* Title */}
      <Reveal show={isVisible("title")}>
        <h3 className="text-base font-medium mb-4">
          Stripe — last 7 days: what changed
        </h3>
      </Reveal>

      {/* Section 1 */}
      <section className="mb-6">
        <Reveal show={isVisible("s1-title")}>
          <h4 className="font-medium mb-2">
            1) Recent conversations (meetings + notes)
          </h4>
        </Reveal>

        <ul className="space-y-2">
          <Reveal show={isVisible("s1-item-1")}>
            <li>No major strategic shifts captured in recent meeting notes.</li>
          </Reveal>

          <Reveal show={isVisible("s1-item-2")}>
            <li>
              A few recurring themes to confirm on the next touchpoint:
              <ul className="mt-2 ml-4 list-disc space-y-1 text-[#CFCFCF]">
                <Reveal show={isVisible("s1-sub-1")}>
                  <li>Timeline + decision process</li>
                </Reveal>
                <Reveal show={isVisible("s1-sub-2")}>
                  <li>Key success metrics / rollout scope</li>
                </Reveal>
                <Reveal show={isVisible("s1-sub-3")}>
                  <li>Any blockers on security / procurement</li>
                </Reveal>
              </ul>
            </li>
          </Reveal>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-6">
        <Reveal show={isVisible("s2-title")}>
          <h4 className="font-medium mb-2">
            2) Deal / pipeline activity
          </h4>
        </Reveal>

        <ul className="space-y-2">
          <Reveal show={isVisible("s2-item-1")}>
            <li>No meaningful stage movement recorded this week.</li>
          </Reveal>

          <Reveal show={isVisible("s2-item-2")}>
            <li>
              Activity signals (if any) look like “keeping warm” rather than
              “closing momentum.”
            </li>
          </Reveal>

          <Reveal show={isVisible("s2-item-3")}>
            <li>
              Suggested next action: a clear mutual plan with dates (next meeting +
              decision checkpoint).
            </li>
          </Reveal>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-6">
        <Reveal show={isVisible("s3-title")}>
          <h4 className="font-medium mb-2">
            3) Public signals (news + web)
          </h4>
        </Reveal>

        <ul className="space-y-2">
          <Reveal show={isVisible("s3-item-1")}>
            <li>
              No high-signal announcements in the past week that materially change
              positioning.
            </li>
          </Reveal>

          <Reveal show={isVisible("s3-item-2")}>
            <li>
              Anything relevant appears incremental rather than a “big launch” or
              major shift.
            </li>
          </Reveal>
        </ul>
      </section>

      {/* Recommended next steps */}
      <section>
        <Reveal show={isVisible("next-title")}>
          <h4 className="font-medium mb-2">
            Recommended next steps
          </h4>
        </Reveal>

        <ul className="space-y-2">
          <Reveal show={isVisible("next-item-1")}>
            <li>
              Send a short “mutual plan” email: outcomes, owners, and dates.
            </li>
          </Reveal>

          <Reveal show={isVisible("next-item-2")}>
            <li>
              Ask one direct question to unblock:
              <span className="italic text-[#CFCFCF]">
                {" "}“What needs to be true for you to sign off?”
              </span>
            </li>
          </Reveal>

          <Reveal show={isVisible("next-item-3")}>
            <li>
              If timing is slipping, propose a smaller pilot scope to keep momentum.
            </li>
          </Reveal>
        </ul>
      </section>
    </div>
  )
}

/**
 * Reveal animation.
 */
function Reveal({
  show,
  children,
}: {
  show: boolean
  children: React.ReactNode
}) {
  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
