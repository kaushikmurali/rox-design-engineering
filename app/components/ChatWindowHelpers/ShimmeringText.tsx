"use client"

type ShimmeringTextProps = {
  text: string
  className?: string
  duration?: number
  opacity?: number
  shimmer?: boolean
}

export function ShimmeringText({
  text,
  className = "",
  duration = 1.3,
  opacity = 0.18,
  shimmer = true,
}: ShimmeringTextProps) {
  if (!shimmer) {
    return (
      <span className={`inline-block text-white ${className}`}>
        {text}
      </span>
    )
  }

  return (
    <div className="shimmering-text">
      <span
        className={`inline-block text-white ${className}`}
        style={
          {
            "--shimmer-opacity": opacity,
            "--shimmer-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {text}
      </span>
    </div>
  )
}
