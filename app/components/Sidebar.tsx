import Image from "next/image"

export function Sidebar() {
  return (
    <aside className="w-14 p-2 flex flex-col items-center gap-1">
      <SidebarButton src="/icons/rox-logomark.svg" alt="Rox" />
      <SidebarButton src="/icons/pencil.svg" alt="New chat" />

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
}: {
  src: string
  alt: string
}) {
  return (
    <button className="group w-10 h-10 rounded-lg p-2 hover:bg-[#1A1A1A] flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        width={20}
        height={20}
        className=""
      />
    </button>
  )
}
