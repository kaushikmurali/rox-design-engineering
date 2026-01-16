// ChatScreen.tsx
"use client"

import { useState } from "react"
import { ChatWindow } from "./ChatWindow"
import { ChatRunningWindow } from "./ChatRunningWindow"
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
    <>
      <Sidebar onResetChat={resetChat} />

      {status === "idle" ? (
        <ChatWindow onSend={handleSend} />
      ) : (
        <ChatRunningWindow prompt={prompt} />
      )}
    </>
  )
}
