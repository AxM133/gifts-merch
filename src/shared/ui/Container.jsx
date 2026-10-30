import { cn } from '../lib'

export function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('section-x mx-auto w-full max-w-[1920px]', className)} {...rest}>
      {children}
    </Tag>
  )
}
