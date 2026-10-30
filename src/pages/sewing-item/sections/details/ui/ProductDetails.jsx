import { Accordion, Container, Reveal } from '@/shared/ui'
import { detailItems, detailsImage } from '../model/content'

export function ProductDetails({ subject }) {
  const items = detailItems(subject).map((item) => ({
    id: item.id,
    title: item.title,
    content: (
      <>
        {item.lines.map((line) => (
          <p key={line}>{line}</p>
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
    <section className="py-10 lg:py-[5rem]" aria-label="Подробности пошива">
      <Container className="grid items-start gap-12 lg:grid-cols-[1fr_0.62fr]">
        <Reveal>
          <Accordion items={items} multiple defaultOpen={items.map((i) => i.id)} size="lg" className="max-w-[44rem]" />
        </Reveal>
        <Reveal direction="left" delay={150} className="justify-self-center lg:justify-self-start">
          <img src={detailsImage.src} alt={detailsImage.alt} loading="lazy" className="w-full max-w-[28rem] rounded-[0.8rem] shadow-card lg:max-w-[31rem]" />
        </Reveal>
      </Container>
    </section>
  )
}
