import Image from "next/image"

export function ChatHeader() {
  return (
    <div className="flex items-center justify-center py-10">
      {/* Rox logo goes here */}
      <Image
        src="/icons/rox-logo.svg"
        alt="rox-logo"
        width={160}
        height={48}
        />
    </div>
  )
}
