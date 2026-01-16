import Image from "next/image"

export function AccountSelector() {
  return (
    <button className="flex bg-[#1A1A1A] pl-3 pr-2 py-2 border-[0.5px] border-white/5 rounded-lg items-center gap-1.5 shadow-selector-btn">
        <Image
            src="/icons/stripe.png"
            alt="avatar"
            width={16}
            height={16}
            className="rounded-sm"
        />

        <span className="text-sm font-medium">Stripe</span>

        <Image
            src="./icons/arrow-down-01.svg"
            alt="arrow-up"
            width={16}
            height={16}
        />
    </button>
  )
}