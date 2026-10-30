import { Link } from 'react-router'
import { Reveal } from '@/shared/ui'
import { cn } from '@/shared/lib'

export function PopularTile({ tile, delay, className, caption }) {
  return (
    <Reveal delay={delay} direction="zoom" className={cn('min-h-0', className)}>
      <Link to={tile.to} className="group flex h-full flex-col">
        <span className="relative block min-h-0 flex-1 overflow-hidden rounded-[1.5rem] bg-[#e5e5e7] shadow-card">
          <img
            src={tile.image}
            alt={tile.label}
            loading="lazy"
            className="size-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.06]"
          />
          <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/70 to-transparent px-5 pt-10 pb-4 text-[1.1rem] font-semibold text-white transition duration-500 ease-out-expo group-hover:translate-y-0">
            {tile.label}
          </span>
        </span>
        {caption && <span className="block pt-5 text-center text-[1.45rem] font-medium">{tile.label}</span>}
      </Link>
    </Reveal>
  )
}
