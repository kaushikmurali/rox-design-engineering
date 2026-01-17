"use client"

import Image from "next/image"

function IconButton({
  src,
  alt,
  muted = false,
}: {
  src: string
  alt: string
  muted?: boolean
}) {
  return (
    <button
      className="
        group
        rounded-lg p-2
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
        width={16}
        height={16}
        className={`
          transition-opacity duration-150 ease-out
          ${muted ? "opacity-70 group-hover:opacity-100" : "opacity-100"}
        `}
      />
    </button>
  )
}

export function AnswerToolbar() {
  return (
    <div className="flex items-center justify-between mt-4">
      {/* Left actions */}
      <div className="flex items-center gap-1">
        <IconButton
          src="/icons/share-05.svg"
          alt="Share"
          muted
        />
        <IconButton
          src="/icons/copy-01.svg"
          alt="Copy"
          muted
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <IconButton
          src="/icons/thumbs-up.svg"
          alt="Like"
          muted
        />
        <IconButton
          src="/icons/thumbs-down.svg"
          alt="Dislike"
          muted
        />
      </div>
    </div>
  )
}
