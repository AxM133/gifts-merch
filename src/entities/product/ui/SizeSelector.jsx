import { cn } from '@/shared/lib'

export function SizeSelector({ sizes, value, onChange, className }) {
  return (
    <div className={className}>
      <p id="size-label" className="text-[1rem] font-medium">
        Размер
      </p>
      <div role="radiogroup" aria-labelledby="size-label" className="mt-1 flex gap-4">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={value === size}
            onClick={() => onChange(size)}
            className={cn(
              'border-b-2 pb-0.5 text-[0.75rem] transition duration-200 hover:text-violet',
              value === size ? 'border-ink font-semibold text-ink' : 'border-transparent text-body/70',
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
