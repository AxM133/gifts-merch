import { cn } from '@/shared/lib'

export function ColorDots({ colors, selected, onSelect, size = 'md', className }) {
  const dot = size === 'lg' ? 'size-[1.45rem]' : 'size-[1.2rem]'
  return (
    <ul className={cn('flex items-center gap-1.5', className)} aria-label="Цвета">
      {colors.map((color) => {
        const active = selected === color.hex
        const style = { backgroundColor: color.hex }
        const ring = cn(
          dot,
          'block rounded-full ring-offset-2 transition duration-200',
          active ? 'ring-2 ring-brand' : 'ring-0',
          onSelect && 'cursor-pointer hover:scale-125',
        )
        return (
          <li key={color.hex}>
            {onSelect ? (
              <button
                type="button"
                title={color.name}
                aria-label={color.name}
                aria-pressed={active}
                onClick={() => onSelect(color.hex)}
                className={ring}
                style={style}
              />
            ) : (
              <span title={color.name} className={ring} style={style} />
            )}
          </li>
        )
      })}
    </ul>
  )
}
