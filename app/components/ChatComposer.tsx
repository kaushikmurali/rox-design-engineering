"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { AccountSelector } from "./AccountSelector"

export function ChatComposer() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState("")

  const hasText = value.trim().length > 0

  function autoGrow(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const el = e.target
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }

  return (
    <div
      className="
        relative
        w-150
        bg-[#1A1A1A]
        border-[0.5px] border-[#222222]/10
        rounded-2xl
        shadow-chat-input
      "
    >
      {/* ===== Glow layer (CLIPPED) ===== */}
      <div
        className="
          absolute inset-0
          overflow-hidden
          rounded-2xl
          pointer-events-none
        "
      >
        <div className="ellipse-glow" />
      </div>

      {/* ===== Content layer (FREE) ===== */}
      <div className="relative z-10 flex flex-col">
        {/* Input area */}
        <div className="px-4 py-4">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            placeholder="Ask your next question"
            onChange={(e) => setValue(e.target.value)}
            onInput={autoGrow}
            className="
              w-full resize-none bg-transparent outline-none
              text-base leading-relaxed font-light
              text-white placeholder:text-[#555]
            "
          />
        </div>

        {/* Separators */}
        <div className="h-px w-full bg-black" />
        <div className="h-px w-full bg-white/5" />

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <AccountSelector />

          <button
            disabled={!hasText}
            aria-label="Send message"
            className={`
              p-2 rounded-full transition-all duration-150 ease-out
              ${hasText
                ? "bg-[linear-gradient(135deg,#D7B58C,#976B35)]"
                : "bg-[#AAAAAA] cursor-not-allowed opacity-60"
              }
            `}
          >
            <Image
              src="/icons/arrow-up-02.svg"
              alt="arrow-up"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
