import { LeadForm } from '@/features/lead-form'
import { Container, Reveal, Wave } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { leadBannerContent as c } from '../model/content'

export function LeadBanner({ variant = 'wave', id }) {
  const wave = variant === 'wave'
  return (
    <section
      id={id}
      aria-label="Заявка на мерч"
      className={cn('relative overflow-hidden', wave ? 'bg-gradient-to-b from-[#ebe1f5] via-[#ddd2f3] to-[#d4cbf3] pt-[7rem] pb-[7.5rem] lg:pt-[12.5rem] lg:pb-[10rem]' : 'py-16 lg:py-[6rem]')}
    >
      {wave && <Wave variant="c" className="absolute top-[-1px] left-0 h-[5rem] rotate-180 text-page lg:h-[9.6rem]" />}
      {wave && <Wave variant="a" className="absolute bottom-[-1px] left-0 h-[4rem] text-page lg:h-[6rem]" />}
      <Container className="relative">
        <Reveal
          direction="left"
          delay={120}
          className="pointer-events-none mx-auto mb-8 w-[min(34rem,92%)] lg:absolute lg:-top-[8.4rem] lg:right-[-0.5vw] lg:mx-0 lg:mb-0 lg:w-[47.4vw]"
        >
          <img src={c.image} alt="" aria-hidden="true" loading="lazy" className="w-full animate-float-slow" />
        </Reveal>

        <div className="relative max-w-[38rem]">
          <Reveal>
            <h2 className="text-[1.8rem] leading-[1.25] font-bold lg:text-[2.35rem]">
              {c.title[0]}
              <span className="font-extrabold">{c.title[1]}</span>
              {c.title[2]}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 max-w-[30rem] text-[1.1rem] leading-snug text-body">{c.text}</p>
          </Reveal>
        </div>

        <Reveal delay={150} className="relative mt-16 lg:mt-[8rem]">
          <p className="mb-8 max-w-[34rem] text-[1.4rem] leading-snug font-semibold">{c.lead}</p>
          <LeadForm variant="row" successText={c.successText} />
        </Reveal>
      </Container>
    </section>
  )
}
