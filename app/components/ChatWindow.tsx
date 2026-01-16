import Image from "next/image"
import { ChatComposer } from "./ChatComposer"

export function ChatWindow({
  onSend,
}: {
  onSend: (value: string) => void
}) {
  return (
    <section className="w-full flex flex-col pt-[30vh] items-center rounded-xl bg-[#0F0F0F]">
      <div className="max-w-173 gap-y-9 flex flex-col">
        <div className="flex items-center justify-center py-10">
            {/* Rox logo goes here */}
              <Image
                src="/icons/rox-logo.svg"
                alt="rox-logo"
                width={160}
                height={48}
                />
        </div>

        <ChatComposer onSend={onSend} />
      </div>
    </section>
  )
}
