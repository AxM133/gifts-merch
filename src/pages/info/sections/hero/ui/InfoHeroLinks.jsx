import { infoContent as c } from '../model/content'

export function InfoHeroLinks() {
  return (
    <ul className="flex flex-wrap gap-x-[2.4rem] gap-y-3 pt-6 text-[0.95rem] font-medium text-violet">
      {c.links.map((link) => (
        <li key={link.label}>
          <a href={link.href} className="underline-draw transition-colors hover:text-ink">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
