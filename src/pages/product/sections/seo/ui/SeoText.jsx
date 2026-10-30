import { Container, Reveal } from '@/shared/ui'
import { productSeoText } from '../model/content'

export function SeoText() {
  return (
    <section className="py-8 lg:py-[3rem]" aria-label="Описание">
      <Container>
        <Reveal className="max-w-[52rem] space-y-6 text-[0.8rem] leading-[1.45] text-body">
          {productSeoText.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
