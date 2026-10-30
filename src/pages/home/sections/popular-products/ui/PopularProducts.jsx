import { Link } from 'react-router'
import { ArrowRightIcon, Container, Reveal, StarIcon, Wave } from '@/shared/ui'
import { popularHeader, popularTiles } from '../model/content'
import { PopularTile } from './PopularTile'

export function PopularProducts() {
  const [tote, mugs, thermos, tshirt] = popularTiles
  return (
    <section className="relative bg-mist pt-2 pb-[8.5rem]" aria-labelledby="popular-title">
      <Container>
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <h2 id="popular-title" className="flex items-start gap-3 text-[2.6rem] leading-none font-semibold">
              {popularHeader.title}
              <StarIcon className="mt-1 size-[1.5rem] animate-pop text-mint" />
            </h2>
            <p className="mt-3 text-[0.85rem] text-body">{popularHeader.subtitle}</p>
          </div>
          <Link
            to={popularHeader.allTo}
            className="group mb-2 hidden items-center gap-3 text-[0.9rem] text-body transition-colors hover:text-ink sm:flex"
          >
            {popularHeader.allLabel}
            <ArrowRightIcon className="size-7 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-[1rem] lg:grid-cols-[2.3fr_1fr] lg:grid-rows-[19.5rem_15.5rem]">
          <PopularTile tile={tote} caption className="aspect-[4/3] lg:row-span-2 lg:aspect-auto" />
          <PopularTile tile={mugs} delay={120} className="aspect-[2/1] lg:aspect-auto" />
          <div className="grid grid-cols-2 gap-[1rem]">
            <PopularTile tile={thermos} delay={220} className="aspect-square lg:aspect-auto" />
            <PopularTile tile={tshirt} delay={320} className="aspect-square lg:aspect-auto" />
          </div>
        </div>
      </Container>
      <Wave variant="c" className="absolute bottom-0 left-0 h-[5rem] text-page lg:h-[6.4rem]" />
    </section>
  )
}
