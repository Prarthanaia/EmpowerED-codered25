export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <circle cx="20" cy="20" r="20" fill="currentColor" fillOpacity="0.1" />
        <path
          d="M20 10C14.477 10 10 14.477 10 20C10 25.523 14.477 30 20 30C25.523 30 30 25.523 30 20C30 14.477 25.523 10 20 10ZM20 28C15.582 28 12 24.418 12 20C12 15.582 15.582 12 20 12C24.418 12 28 15.582 28 20C28 24.418 24.418 28 20 28Z"
          fill="currentColor"
        />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
      </svg>
      <span className="text-xl font-bold">EmpowerED</span>
    </div>
  )
}

