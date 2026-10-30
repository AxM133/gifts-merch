import { Container, Reveal } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { termsColumns } from '../model/content'

export function TermsColumns() {
  return (
    <section className="pt-6 pb-16 lg:pt-[3.2rem] lg:pb-[6rem]" aria-label="Условия работы">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-[3rem]">
        {termsColumns.map((col, i) => (
          <Reveal key={col.id} delay={i * 130}>
            <h2 className="text-[1.9rem] font-medium lg:text-[2.1rem]">{col.title}</h2>
            <div className="mt-6 max-w-[22rem] space-y-6 text-[0.85rem] leading-[1.45] text-body">
              {col.body.map((p, j) => (
                <p key={j} className={cn(p.accent && 'text-[#5a4aa0]')}>
                  {p.text}
                  {p.strong && <strong className="font-semibold text-ink">{p.strong}</strong>}
                  {p.tail}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}
