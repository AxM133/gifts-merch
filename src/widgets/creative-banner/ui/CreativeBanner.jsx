import { LeadForm } from '@/features/lead-form'
import { Button, Container, Reveal } from '@/shared/ui'
import { creativeAssets, creativeContent } from '../model/content'

function BoxPicture() {
  return (
    <Reveal direction="left" delay={150} className="relative mx-auto w-[min(34rem,90%)] lg:absolute lg:top-1/2 lg:right-[10.4vw] lg:mx-0 lg:w-[36.5vw] lg:-translate-y-1/2">
      <img src={creativeAssets.box} alt="Подарочный бокс" loading="lazy" className="w-full animate-float-soft" />
    </Reveal>
  )
}

export function CreativeBanner({ variant = 'cta', id }) {
  const c = creativeContent[variant]
  return (
    <section id={id} className="relative overflow-hidden bg-gradient-to-b from-page via-[#f4f4f4] to-page py-16 lg:py-[6.6rem]">
      <Container className="relative grid items-center gap-12 lg:min-h-[34rem]">
        <div className="max-w-[60rem]">
          <Reveal>
            <img src={creativeAssets.logo} alt="Creative" className="ml-[3rem] w-[16rem] max-w-[60%] lg:ml-[12.5rem]" />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-[1.4rem] text-[2rem] leading-[1.2] font-bold lg:text-[2.75rem]">{c.title}</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-[30rem] text-[1.1rem] leading-snug text-body">{c.text}</p>
          </Reveal>

          {variant === 'cta' ? (
            <Reveal delay={300} className="mt-10 flex flex-wrap gap-[1.9rem]">
              <Button to={c.primary.to} variant="dark" className="min-w-[17.5rem] py-[1.35rem]">
                {c.primary.label}
              </Button>
              <Button to={c.secondary.to} variant="soft" className="min-w-[17.5rem] py-[1.35rem]">
                {c.secondary.label}
              </Button>
            </Reveal>
          ) : (
            <Reveal delay={300} className="mt-6 grid gap-8 md:grid-cols-[17rem_17rem]">
              <p className="text-[1.3rem] leading-snug font-semibold">
                {c.lead} <span className="text-mint">{c.leadAccent}</span>
              </p>
              <LeadForm variant="stack" successText={c.successText} />
            </Reveal>
          )}
        </div>
        <BoxPicture />
      </Container>
    </section>
  )
}
