// ChatScreen.tsx
"use client"

import { useState } from "react"
import { ChatWindow } from "./ChatWindow"
import { ChatRunningWindow } from "./ChatRunningWindow"
import { ChatComposer } from "./ChatComposer"
import { Sidebar } from "./Sidebar"

type ChatStatus = "idle" | "running"

export function ChatScreen() {
  const [status, setStatus] = useState<ChatStatus>("idle")
  const [prompt, setPrompt] = useState("")

  function handleSend(message: string) {
    setPrompt(message)
    setStatus("running")
  }

  function resetChat() {
    setPrompt("")
    setStatus("idle")
  }

  return (
    <div className="h-screen w-full flex bg-[#0F0F0F]">
      <Sidebar onResetChat={resetChat} />

      <div className="relative flex-1 flex justify-center">
        <div className="relative w-173 h-full flex flex-col">

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto pb-[140px]">
            {status === "idle" ? (
              <ChatWindow onSend={handleSend} />
            ) : (
              <ChatRunningWindow prompt={prompt} />
            )}
          </div>

          {/* Composer — only when running */}
          {status === "running" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-6">
              <ChatComposer
                onSend={handleSend}
                variant="running"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
