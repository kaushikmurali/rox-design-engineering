import { ChatHeader } from "./ChatHeader"
import { ChatMessages } from "./ChatMessages"
import { ChatComposer } from "./ChatComposer"

export function ChatWindow() {
  return (
    <section className="w-full flex flex-col pt-[30vh] items-center rounded-xl bg-[#0F0F0F]">
        <div className="max-w-173 gap-y-9">
            {/* Header */}
            <ChatHeader />

            {/* Messages */}
            <ChatMessages />

            {/* Input */}
            <ChatComposer />
        </div>
    </section>
  )
}
