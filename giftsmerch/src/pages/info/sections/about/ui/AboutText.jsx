import { Container, Reveal } from '@/shared/ui'
import { aboutBlocks } from '../model/content'

export function AboutText({ id = 'about' }) {
  return (
    <section id={id} className="scroll-mt-10 py-4 lg:py-[1.5rem]" aria-label="О компании">
      <Container className="space-y-[3.8rem]">
        {aboutBlocks.map((block, i) => (
          <Reveal key={block.id} delay={i * 100}>
            <h2 className="text-[1.6rem] font-medium lg:text-[2.1rem]">{block.title}</h2>
            <p className="mt-4 max-w-[78rem] text-[0.9rem] leading-snug text-body">{block.text}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}
