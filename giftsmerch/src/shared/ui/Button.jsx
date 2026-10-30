import { Link } from 'react-router'
import { cn } from '../lib'

const base =
  'inline-flex select-none items-center justify-center gap-2 rounded-full px-[2.25rem] py-[1.05rem] text-[1.05rem] font-medium leading-none whitespace-nowrap transition duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60'

const variants = {
  dark: 'bg-ink text-white hover:bg-black hover:shadow-soft',
  brand: 'bg-brand text-white hover:bg-violet hover:shadow-soft',
  mint: 'bg-mint text-white hover:bg-mint-dark hover:shadow-[0_14px_28px_-12px_rgb(31_169_135/0.7)]',
  soft: 'bg-mist text-ink hover:bg-[#e2e5f2]',
  ghost: 'bg-transparent text-ink hover:bg-white/50',
}

export function Button({ variant = 'dark', to, href, className, children, type = 'button', ...rest }) {
  const classes = cn(base, variants[variant], className)
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
