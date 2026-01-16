import Image from "next/image"

export function Sidebar() {
  return (
    <aside className="w-14 p-2 flex flex-col items-center gap-1">
      <SidebarButton
        src="/icons/rox-logomark.svg"
        alt="Rox"
        muted={false}
      />

      <SidebarButton
        src="/icons/pencil.svg"
        alt="New chat"
        muted
      />

      <div className="mt-auto">
        <Image
          src="/icons/avatar.png"
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </aside>
  )
}


function SidebarButton({
  src,
  alt,
  muted = true,
}: {
  src: string
  alt: string
  muted?: boolean
}) {
  return (
    <button
      className="
        group
        w-10 h-10 rounded-lg p-2
        flex items-center justify-center

        hover:bg-[#1A1A1A]
        active:bg-[#222222]

        transition-colors duration-150 ease-out

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/20
      "
    >
      <Image
        src={src}
        alt={alt}
        width={20}
        height={20}
        className={`
          transition-opacity duration-150 ease-out
          ${muted ? "opacity-70 group-hover:opacity-100" : "opacity-100"}
        `}
      />
    </button>
  )
}
