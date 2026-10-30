import { LeadForm } from '@/features/lead-form'
import { Container, PhoneWavesIcon, Reveal, TelegramIcon, ViberIcon, WhatsAppIcon } from '@/shared/ui'
import { contactsContent as c } from '../model/content'

const ICONS = { viber: ViberIcon, telegram: TelegramIcon, whatsapp: WhatsAppIcon }

export function ContactsSection({ id = 'contacts' }) {
  return (
    <section id={id} aria-labelledby="contacts-title" className="scroll-mt-10 py-12 lg:py-[3.5rem]">
      <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.4fr]">
        <Reveal>
          <h2 id="contacts-title" className="flex items-center gap-3 text-[2.2rem] font-bold lg:text-[2.85rem]">
            {c.title}
            <PhoneWavesIcon className="size-[3.2rem] animate-float-soft text-brand" />
          </h2>
          <a href={`mailto:${c.email}`} className="mt-[3.2rem] block text-[1.9rem] font-medium transition-colors hover:text-brand">
            {c.email}
          </a>
          <a href={c.phoneHref} className="mt-4 block text-[2.15rem] font-bold transition-colors hover:text-brand">
            {c.phone}
          </a>
          <ul className="mt-3 flex items-center gap-4">
            {c.messengers.map((m) => {
              const Icon = ICONS[m.id]
              return (
                <li key={m.id}>
                  <a href={m.href} aria-label={m.label} className="block transition duration-300 hover:-translate-y-1 hover:scale-110">
                    <Icon className="size-[2.2rem]" />
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>
        <Reveal delay={150} className="grid gap-8 md:grid-cols-[17rem_1fr] lg:pt-[1rem]">
          <div>
            <h3 className="sr-only">{c.formTitle}</h3>
            <p className="text-[1.3rem] leading-snug font-semibold">
              {c.lead} <span className="text-mint">{c.leadAccent}</span>
            </p>
          </div>
          <LeadForm variant="stack" successText={c.successText} className="max-w-[17rem]" />
        </Reveal>
      </Container>
    </section>
  )
}
