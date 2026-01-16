import Image from "next/image"

export function ChatRunningWindow({ prompt }: { prompt: string }) {
  return (
    <section className="w-full flex flex-col bg-[#0F0F0F] rounded-xl relative items-center">
        <div className="w-173 gap-6">
            {/* User message bubble */}
            <div className="pt-6 px-6 self-end justify-items-end">
                <div className="bg-[#1A1A1A] w-fit rounded-xl px-4 py-3 text-white text-sm">
                {prompt}
                </div>
            </div>


            <div className="w-150">
                {/* Progress card */}
                <div className="flex flex-col gap-y-4 mt-6 px-4 pt-3 pb-5 rounded-2xl border border-[#1A1A1A]">

                    {/* Progress header */}
                    <div className="flex items-center justify-between text-sm gap-2">
                        <Image
                            src="/icons/rox-logomark.svg"
                            alt="Rox"
                            width={20}
                            height={20}
                            className="flex-0"
                        />
                        <span className="text-white font-normal flex-1">Starting now...</span>
                        <span className="text-[#AAAAAA] font-light flex-1 text-end">2 mins left</span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 rounded-full bg-[#253726] overflow-hidden">
                        <div className="h-full w-0 bg-[#6DBF6F]" />
                    </div>
                </div>
            </div>
        </div>
      

        {/* Docked input */}
        <div className="absolute bottom-6 w-full flex justify-center">
            {/* reuse ChatComposer later if needed */}
        </div>
    </section>
  )
}
