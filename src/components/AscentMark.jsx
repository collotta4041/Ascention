export default function AscentMark({ compact = false }) {
  return (
    <svg
      className={compact ? 'ascent-mark ascent-mark--compact' : 'ascent-mark'}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path d="M10 49 25 34l8 8L54 21" />
      <path d="M39 21h15v15" />
      <path className="ascent-mark__step" d="M12 55h12M25 48h12M38 41h12" />
    </svg>
  )
}
