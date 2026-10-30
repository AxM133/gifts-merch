import { Link } from 'react-router'
import { cn } from '../lib'

export function Logo({ className, as: Tag = Link, ...rest }) {
  const props = Tag === Link ? { to: '/' } : {}
  return (
    <Tag
      aria-label="Gifts & Merch — на главную"
      className={cn(
        'font-logo text-[3.05rem] leading-none font-semibold tracking-[0.19em] whitespace-nowrap text-ink uppercase transition-opacity hover:opacity-80',
        className,
      )}
      {...props}
      {...rest}
    >
      Gifts &amp; Merch
    </Tag>
  )
}
