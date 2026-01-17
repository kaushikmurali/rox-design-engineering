// ChatScreen.tsx
"use client"

import { useState } from "react"
import { ChatIdleScreen } from "./ChatIdleScreen"
import { ChatRunningScreen } from "./ChatRunningScreen"
import { Sidebar } from "./Sidebar"

type ChatStatus = "idle" | "running" | "completed"

export function ChatScreen() {
  const [status, setStatus] = useState<ChatStatus>("idle")
  const [prompt, setPrompt] = useState("")

  function handleSend(message: string) {
    setPrompt(message)
    setStatus("running")
  }

  function handleRunComplete() {
    setStatus("completed")
  }

  function resetChat() {
    setPrompt("")
    setStatus("idle")
  }

  const composerVariant =
    status === "running" ? "running" : "idle"

  return (
    <>
      <Sidebar onResetChat={resetChat} />

      {status === "idle" ? (
        <ChatIdleScreen onSend={handleSend} />
      ) : (
        <ChatRunningScreen
          prompt={prompt}
          onRunComplete={handleRunComplete}
        />
      )}
    </>
  )
}


