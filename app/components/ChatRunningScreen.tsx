
import { ChatRunningWindow } from "./ChatRunningWindow"
import { ChatComposer } from "./ChatComposer"
import { useState } from "react"

export function ChatRunningScreen({
  prompt,
  onRunComplete,
}: {
  prompt: string
  onRunComplete: () => void
}) {
  const [isCompleted, setIsCompleted] = useState(false)

  function handleRunComplete() {
    setIsCompleted(true)
    onRunComplete()
  }

  return (
    <section className="relative w-full bg-[#0F0F0F]">
      {/* Scrollable content */}
      <div className="flex flex-col items-center pb-40">
        <ChatRunningWindow
          prompt={prompt}
          onRunComplete={handleRunComplete}
        />
      </div>

      {/* Fixed composer */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <ChatComposer
            variant={isCompleted ? "idle" : "running"}
            onSend={() => {}}
            location="running-window"
        />
      </div>

    </section>
  )
}

