import { cn } from '../lib'

const PATHS = {

  a: 'M0 96C170 36 360 6 600 14c260 9 400 86 640 88 100 1 170-34 200-66V140H0Z',
  b: 'M0 40C200 96 420 100 700 62 960 28 1180 12 1440 58V140H0Z',
  c: 'M0 70C240 8 470 4 720 46s500 70 720 0V140H0Z',
}

export function Wave({ variant = 'a', flip = false, className }) {
  return (
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn('block h-[5.5rem] w-full', flip && 'rotate-180', className)}
    >
      <path d={PATHS[variant]} fill="currentColor" />
    </svg>
  )
}
