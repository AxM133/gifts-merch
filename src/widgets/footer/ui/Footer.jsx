import { Link } from 'react-router'
import { CallbackForm } from '@/features/lead-form'
import { SITE } from '@/shared/config'
import { FacebookIcon, InstagramIcon, LinkedinIcon, Logo, Reveal, Wave } from '@/shared/ui'
import { callbackBlock, footerColumns, legal } from '../model/content'

export function Footer() {
  return (
    <footer className="relative mt-4 bg-gradient-to-b from-[#f3f0fb] to-[#f9eff6]">
      <Wave variant="b" className="absolute -top-[5.4rem] left-0 h-[5.5rem] text-[#f3f0fb]" />
      <Reveal className="section-x mx-auto grid max-w-[1920px] gap-10 pt-6 pb-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_0.6fr_0.6fr_1fr] lg:pt-12">
        <div>
          <Logo className="text-[1.7rem] lg:text-[3.05rem]" />
          <p className="mt-3 max-w-[26rem] text-[1.05rem] leading-snug text-body">
            {SITE.tagline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="mt-9 text-[0.85rem] leading-snug font-medium">
            <a href={SITE.phoneHref} className="hover:text-brand">
              {SITE.phone}
            </a>
            <br />
            <a href={`mailto:${SITE.email}`} className="underline underline-offset-2 hover:text-brand">
              {SITE.email}
            </a>
          </p>
          <ul className="mt-5 flex items-center gap-5">
            {[
              { label: 'Facebook', Icon: FacebookIcon },
              { label: 'Instagram', Icon: InstagramIcon },
              { label: 'LinkedIn', Icon: LinkedinIcon },
            ].map(({ label, Icon }) => (
              <li key={label}>
                <a href="#" aria-label={label} className="block transition duration-300 hover:-translate-y-1 hover:scale-110">
                  <Icon className="size-6" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-[1.1rem] font-semibold">{column.title}</h2>
            <ul className="mt-3 space-y-[1.55rem] text-[1rem] text-body">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="underline-draw transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="max-w-[20rem]">
          <h2 className="text-[1.1rem] font-semibold">{callbackBlock.title}</h2>
          <p className="mt-2 mb-5 text-[0.8rem] leading-snug text-muted">{callbackBlock.text}</p>
          <CallbackForm />
        </div>
      </Reveal>
      <p className="pb-8 text-center text-[0.7rem] text-muted">
        {legal.copyright}{' '}
        <a href="#" className="underline underline-offset-2 hover:text-brand">
          {legal.policy}
        </a>
      </p>
    </footer>
  )
}
