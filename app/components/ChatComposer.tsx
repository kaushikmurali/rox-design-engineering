"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { AccountSelector } from "./AccountSelector"

export function ChatComposer({
  onSend,
}: {
  onSend: (value: string) => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState("")

  const hasText = value.trim().length > 0

  function autoGrow(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const el = e.target
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }

  function handleSend() {
    if (!hasText) return
    onSend(value)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="relative w-150 bg-[#1A1A1A] border-[0.5px] border-[#222222]/10 rounded-2xl shadow-chat-input">
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="ellipse-glow" />
      </div>

      <div className="relative z-10 flex flex-col">
        <div className="px-4 py-4">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            placeholder="Ask your next question"
            onChange={(e) => setValue(e.target.value)}
            onInput={autoGrow}
            onKeyDown={handleKeyDown}
            className="w-full resize-none bg-transparent outline-none text-base leading-relaxed font-light text-white placeholder:text-[#555]"
          />
        </div>

        <div className="h-px w-full bg-black" />
        <div className="h-px w-full bg-white/5" />

        <div className="flex items-center justify-between px-4 py-3">
          <AccountSelector />

          <button
            onClick={handleSend}
            disabled={!hasText}
            className={`
              p-2 rounded-full
              transition-transform duration-150 ease-out
            active:scale-[0.97]

              ${hasText
                ? "bg-[linear-gradient(135deg,#D7B58C,#976B35)]"
                : "bg-[#AAAAAA] opacity-60 cursor-not-allowed"}
            `}
          >
            <Image
              src="/icons/arrow-up-02.svg"
              alt="send"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
