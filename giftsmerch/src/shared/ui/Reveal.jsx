import { cn, useInView } from '../lib'

const hidden = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: 'translate-x-10',
  right: '-translate-x-10',
  zoom: 'scale-95',
  none: '',
}

export function Reveal({ as: Tag = 'div', direction = 'up', delay = 0, className, children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      data-reveal={inView ? 'visible' : 'hidden'}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      className={cn(
        'transition-[opacity,transform] duration-[800ms] ease-out-expo motion-reduce:transition-none',
        inView ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : ['opacity-0', hidden[direction]],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
