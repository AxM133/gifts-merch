import { PartnerLogo } from '@/entities/partner'
import { ChevronIcon, Container, Reveal } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { usePartnersCarousel } from '../model/usePartnersCarousel'

export function Partners() {
  const carousel = usePartnersCarousel()
  const arrow =
    'grid size-10 shrink-0 place-items-center rounded-full bg-[#e7e3f6] text-brand transition duration-300 hover:scale-110 hover:bg-[#d8d1f1] active:scale-90'
  return (
    <section className="py-12 lg:py-[5rem]" aria-labelledby="partners-title">
      <Container>
        <Reveal>
          <h2 id="partners-title" className="text-[2rem] font-bold lg:text-[2.7rem]">
            С нами соотрудничают
          </h2>
        </Reveal>
        <Reveal delay={150} className="mt-12 flex items-center gap-4 lg:mt-[4.3rem]">
          <button type="button" aria-label="Предыдущие партнёры" onClick={carousel.prev} className={arrow}>
            <ChevronIcon direction="left" className="size-5" />
          </button>
          <ul className="grid flex-1 grid-cols-2 items-center gap-2 overflow-hidden sm:grid-cols-3 lg:grid-cols-5">
            {carousel.visible.map((partner) => (
              <li
                key={`${carousel.index}-${partner.id}`}
                className={cn('[&:nth-child(n+3)]:hidden sm:[&:nth-child(n+3)]:block sm:[&:nth-child(n+4)]:hidden lg:[&:nth-child(n+4)]:block', carousel.direction === 'next' ? 'animate-slide-next' : 'animate-slide-prev')}
              >
                <PartnerLogo partner={partner} />
              </li>
            ))}
          </ul>
          <button type="button" aria-label="Следующие партнёры" onClick={carousel.next} className={arrow}>
            <ChevronIcon direction="right" className="size-5" />
          </button>
        </Reveal>
      </Container>
    </section>
  )
}
