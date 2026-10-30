import { Accordion, Container, InfoIcon, Reveal } from '@/shared/ui'
import { faqItems, faqTitle } from '../model/content'

export function FaqSection({ id = 'faq' }) {
  const items = faqItems.map((item) => ({
    id: item.id,
    title: item.title,
    content: (
      <>
        {item.lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
        {item.list && (
          <ul className="mt-0.5 space-y-0.5 pl-2">
            {item.list.map((li) => (
              <li key={li} className="flex gap-2">
                <span aria-hidden="true">•</span>
                {li}
              </li>
            ))}
          </ul>
        )}
      </>
    ),
  }))
  return (
    <section id={id} aria-labelledby="faq-title" className="relative scroll-mt-10 py-10 lg:py-[4.5rem]">
      <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal>
            <h2 id="faq-title" className="text-[2.2rem] font-bold lg:text-[2.85rem]">
              {faqTitle}
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10 max-w-[44rem]">
            <Accordion items={items} defaultOpen={['material']} size="lg" />
          </Reveal>
        </div>
        <Reveal direction="zoom" delay={200} className="hidden justify-self-end lg:block">
          <InfoIcon className="size-[28rem] text-mist" />
        </Reveal>
      </Container>
    </section>
  )
}
