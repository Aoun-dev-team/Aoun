export function WaveDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 430 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M0 30C72 50 144 10 215 30C286 50 358 10 430 30V60H0V30Z"
        className="fill-background"
        opacity="0.5"
      />
      <path
        d="M0 40C72 55 144 20 215 40C286 55 358 20 430 40V60H0V40Z"
        className="fill-background"
      />
    </svg>
  )
}
