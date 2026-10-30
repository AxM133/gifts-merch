import { useId } from 'react'
import { cn } from '../lib'

export function TextField({ label, error, className, inputClassName, ...rest }) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className={cn('group relative', className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        placeholder={label}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'peer w-full border-0 border-b bg-transparent pt-2 pb-1.5 text-[length:max(0.95rem,15px)] text-ink outline-none transition-colors duration-300 placeholder:text-body/80',
          error ? 'border-danger pr-28 text-danger placeholder:text-danger' : 'border-ink/70 focus:border-mint',
          inputClassName,
        )}
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-mint transition-transform duration-500 ease-out-expo peer-focus:scale-x-100',
          error && 'hidden',
        )}
      />
      <p
        id={errorId}
        role={error ? 'alert' : undefined}
        className={cn(
          'absolute right-0 bottom-2 text-[length:max(0.6rem,12px)] text-danger transition-all duration-300',
          error ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-1 opacity-0',
        )}
      >
        {error}
      </p>
    </div>
  )
}
