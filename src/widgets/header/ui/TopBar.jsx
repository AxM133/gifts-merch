import { SearchField } from '@/features/site-search'
import { LanguageSwitch } from '@/features/language-switch'
import { Logo, UserIcon } from '@/shared/ui'
import { contactPhone } from '../model/nav'

export function TopBar({ burger }) {
  return (
    <div className="section-x mx-auto flex h-[5.5rem] w-full max-w-[1920px] items-center gap-4 lg:h-[9rem]">
      <Logo className="text-[1.25rem] sm:text-[1.8rem] lg:text-[3.05rem]" />
      <SearchField className="ml-[3.4rem] hidden w-[30.6rem] lg:flex" />
      <a
        href={contactPhone.href}
        className="ml-[3.8rem] hidden rounded-full bg-mint min-w-[16.5rem] px-[2.2rem] py-[1.25rem] text-center text-[1.1rem] font-medium whitespace-nowrap text-white shadow-[0_10px_24px_-10px_rgb(31_169_135/0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-mint-dark lg:block"
      >
        {contactPhone.label}
      </a>
      <div className="ml-auto hidden items-center gap-[2.6rem] lg:flex">
        <button
          type="button"
          aria-label="Личный кабинет"
          className="text-ink transition duration-300 hover:scale-110 hover:text-brand"
        >
          <UserIcon className="size-[2.2rem]" />
        </button>
        <LanguageSwitch />
      </div>
      {burger}
    </div>
  )
}
