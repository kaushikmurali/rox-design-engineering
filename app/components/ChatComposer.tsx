"use client"
import { useRef } from "react"

export function ChatComposer() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function autoGrow(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const el = e.target
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }

  return (
    <div className="relative overflow-hidden bg-[#1A1A1A] border-[0.5px] w-150 border-[#222222]/10 rounded-2xl shadow-chat-input">
        {/* Glow */}
      <div className="ellipse-glow" />

      <div className="flex flex-col relative z-10">
        {/* Input area */}
        <div className="px-4 py-4">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Ask your next question"
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
          <button className="shrink-0" aria-label="Send message">
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}



export function AccountSelector() {
  return (
    <button className="flex items-center gap-2">
      <span className="text-sm">Stripe</span>
      <span>⌄</span>
    </button>
  )
}
