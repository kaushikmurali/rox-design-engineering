export function ChatRunningWindow({ prompt }: { prompt: string }) {
  return (
    <section className="w-full flex flex-col bg-[#0F0F0F] rounded-xl relative">
      {/* User message bubble */}
      <div className="pt-6 px-6 self-end">
        <div className="bg-[#1A1A1A] rounded-xl px-4 py-3 text-white text-sm">
          {prompt}
        </div>
      </div>

      {/* Progress row */}
      <div className="mt-6 px-6">
        <div className="flex items-center justify-between text-sm text-white/80">
          <span>Starting now...</span>
          <span>2 mins left</span>
        </div>
        <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-1/3 bg-[#3A7D44]" />
        </div>
      </div>

      {/* Docked input */}
      <div className="absolute bottom-6 w-full flex justify-center">
        {/* reuse ChatComposer later if needed */}
      </div>
    </section>
  )
}
