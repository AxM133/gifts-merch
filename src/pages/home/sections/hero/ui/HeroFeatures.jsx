import { Reveal, SparkleIcon } from '@/shared/ui'

export function HeroFeatures({ items }) {
  return (
    <ul className="mt-12 grid max-w-[36rem] grid-cols-3 gap-6">
      {items.map((item, i) => (
        <Reveal as="li" key={item.id} delay={400 + i * 140} className="group flex flex-col items-center text-center">
          <span className="relative grid size-[5.2rem] place-items-center">
            <span className="absolute inset-0 rounded-full bg-[#e8cffa] transition duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-[#f0d9ff]" />
            <SparkleIcon className="absolute -top-2 -right-4 size-9 text-white/90 transition-transform duration-500 group-hover:rotate-12" />
            <item.Icon className="relative size-9 text-brand" />
          </span>
          <span className="mt-3 text-[0.95rem] leading-tight font-medium text-ink">
            {item.label}
            {item.accent && <strong className="font-extrabold"> {item.accent}</strong>}
          </span>
        </Reveal>
      ))}
    </ul>
  )
}
