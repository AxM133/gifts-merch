export function SewingVariants({ variants }) {
  if (variants.length === 0) return null
  return (
    <ul className="mt-6 flex flex-wrap gap-x-[2.4rem] gap-y-2 text-[0.95rem] font-medium">
      {variants.map((v) => (
        <li key={v}>
          <a href="#request" className="underline-draw transition-colors hover:text-violet">
            {v}
          </a>
        </li>
      ))}
    </ul>
  )
}
