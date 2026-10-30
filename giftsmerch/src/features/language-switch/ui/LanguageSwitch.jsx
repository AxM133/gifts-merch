import { cn } from '@/shared/lib'
import { useLanguage } from '../model/useLanguage'

export function LanguageSwitch({ className }) {
  const { language, change } = useLanguage()
  const item = (code, label) => (
    <button
      type="button"
      aria-pressed={language === code}
      onClick={() => change(code)}
      className={cn(
        'transition-colors duration-300 hover:text-brand',
        language === code ? 'font-semibold text-ink' : 'text-body/70',
      )}
    >
      {label}
    </button>
  )
  return (
    <div className={cn('flex items-center gap-1 text-[0.8rem]', className)} role="group" aria-label="Язык">
      {item('ru', 'RU')}
      <span aria-hidden="true" className="text-body/60">
        /
      </span>
      {item('en', 'ENG')}
    </div>
  )
}
