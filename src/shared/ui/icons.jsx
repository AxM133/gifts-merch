import { cn } from '../lib'

const sized = (className, fallback) => cn(fallback, className)

function Svg({ className, children, viewBox = '0 0 24 24', ...rest }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={sized(className, 'size-6')}
      {...rest}
    >
      {children}
    </svg>
  )
}

export const SearchIcon = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </Svg>
)
export const UserIcon = (p) => (
  <Svg strokeWidth="2" {...p}>
    <circle cx="12" cy="8" r="4.5" />
    <path d="M3.5 21c.8-4.6 4-6.8 8.5-6.8s7.7 2.2 8.5 6.8" />
  </Svg>
)
export const BasketIcon = (p) => (
  <Svg strokeWidth="2" {...p}>
    <path d="M3 9.5h18l-1.8 9.2a2 2 0 0 1-2 1.6H6.8a2 2 0 0 1-2-1.6L3 9.5Z" />
    <path d="m8 9.5 3-6m5 6-3-6" />
    <path d="M9.5 13.5v3m5-3v3" />
  </Svg>
)
const ROTATE = { left: 0, right: 180, up: 90, down: -90 }
export const ChevronIcon = ({ direction = 'left', className, ...p }) => (
  <Svg
    strokeWidth="2.2"
    className={className}
    style={{ transform: `rotate(${ROTATE[direction]}deg)` }}
    {...p}
  >
    <path d="m14.5 5-7 7 7 7" />
  </Svg>
)
export const ArrowRightIcon = (p) => (
  <Svg {...p}>
    <path d="M3 12h17m-5-5 5 5-5 5" />
  </Svg>
)
export const CloseIcon = (p) => (
  <Svg strokeWidth="2.2" {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
)
export const CloseCircleIcon = (p) => (
  <Svg strokeWidth="2" {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="m8.8 8.8 6.4 6.4m0-6.4-6.4 6.4" />
  </Svg>
)
export const StarIcon = ({ className, ...p }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={sized(className, 'size-6 fill-current')} {...p}>
    <path d="M12 2.2c.5 0 .9.3 1.1.8l2 4.3 4.7.6c.5.1.9.4 1 .9.2.5 0 1-.4 1.3l-3.4 3.3.9 4.6c.1.5-.1 1-.5 1.3-.4.3-1 .3-1.4.1L12 17l-4.1 2.4c-.5.2-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l.9-4.6-3.4-3.3c-.4-.3-.5-.8-.4-1.3.1-.5.5-.8 1-.9l4.7-.6 2-4.3c.2-.5.6-.8 1.1-.8Z" />
  </svg>
)
export const RulerIcon = (p) => (
  <Svg strokeWidth="1.6" {...p}>
    <path d="m14.5 3.5 6 6-11 11-6-6 11-11Z" />
    <path d="m11 7 2.5 2.5M8.5 9.5 10 11M6 12l2.5 2.5" />
  </Svg>
)
export const MinusIcon = (p) => (
  <Svg strokeWidth="2.4" {...p}>
    <path d="M6 12h12" />
  </Svg>
)
export const PlusIcon = (p) => (
  <Svg strokeWidth="2.4" {...p}>
    <path d="M12 6v12M6 12h12" />
  </Svg>
)
export const CheckIcon = (p) => (
  <Svg strokeWidth="2.6" {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
)
export const InfoIcon = ({ className, ...p }) => (
  <svg viewBox="0 0 200 200" aria-hidden="true" className={cn('fill-current', className)} {...p}>
    <path
      fillRule="evenodd"
      d="M100 0a100 100 0 1 0 0 200A100 100 0 0 0 100 0Zm0 14a86 86 0 1 1 0 172 86 86 0 0 1 0-172Z"
    />
    <circle cx="102" cy="55" r="14" />
    <path d="M92 82h22c4 0 6.700 3.600 5.600 7.400l-13.600 50c-.9 3.300.9 4.600 3.300 3.300l8-4.300c1.500-.8 2.700.9 1.700 2.200-4.800 5.800-13 11.400-22 11.400-9.800 0-14.400-6.700-11.800-16.400l11.200-41.600H92c-3.300 0-3.300-12 0-12Z" />
  </svg>
)
export const FacebookIcon = ({ className, ...p }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={sized(className, 'size-6')} {...p}>
    <circle cx="12" cy="12" r="12" fill="#1877f2" />
    <path
      fill="#fff"
      d="M13.400 19v-6.200h2.100l.4-2.600h-2.500V8.600c0-.8.300-1.300 1.400-1.300H16V5.100c-.3 0-1.100-.1-2-.1-2.100 0-3.500 1.300-3.500 3.600v1.600H8.300v2.600h2.200V19h2.900Z"
    />
  </svg>
)
export const InstagramIcon = ({ className, ...p }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={sized(className, 'size-6')} {...p}>
    <defs>
      <linearGradient id="ig-g" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#f9a03f" />
        <stop offset=".5" stopColor="#e8308f" />
        <stop offset="1" stopColor="#b535d6" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="12" fill="url(#ig-g)" />
    <rect x="6.200" y="6.200" width="11.600" height="11.600" rx="3.400" fill="none" stroke="#fff" strokeWidth="1.600" />
    <circle cx="12" cy="12" r="2.800" fill="none" stroke="#fff" strokeWidth="1.600" />
    <circle cx="15.600" cy="8.400" r=".9" fill="#fff" />
  </svg>
)
export const LinkedinIcon = ({ className, ...p }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={sized(className, 'size-6')} {...p}>
    <rect width="24" height="24" rx="4" fill="#0a66c2" />
    <path fill="#fff" d="M5.500 9.500h2.600V18H5.500V9.500Zm1.300-4a1.500 1.500 0 1 1 0 3 1.500 1.500 0 0 1 0-3ZM9.800 9.500h2.500v1.200c.4-.7 1.300-1.400 2.700-1.400 2.700 0 3.200 1.800 3.200 4V18h-2.600v-4.200c0-1 0-2.200-1.400-2.200s-1.600 1-1.600 2.100V18H9.800V9.500Z" />
  </svg>
)
export const ViberIcon = ({ className, ...p }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={sized(className, 'size-6')} {...p}>
    <path
      fill="none"
      stroke="#7b519d"
      strokeWidth="1.800"
      strokeLinejoin="round"
      d="M12 3c-4.600 0-7.600 1.500-7.600 6.400 0 3 .7 4.700 2.400 5.600V19l3-2.700c.7.100 1.400.1 2.200.1 4.600 0 7.600-1.500 7.600-6.900C19.600 4.500 16.600 3 12 3Z"
    />
    <path fill="none" stroke="#7b519d" strokeWidth="1.600" strokeLinecap="round" d="M9.400 7.600c.2 2.800 2.600 5.200 5.400 5.400" />
  </svg>
)
export const TelegramIcon = ({ className, ...p }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={sized(className, 'size-6')} {...p}>
    <path fill="#2aa3de" d="M21.500 3.200 2.600 10.500c-.9.300-.9 1.300 0 1.600l4.600 1.500 1.800 5.600c.2.600 1 .8 1.500.3l2.600-2.500 4.600 3.400c.6.400 1.400.1 1.500-.6L22.700 4.400c.2-.9-.6-1.500-1.200-1.200ZM9.700 13.300l8.400-5.100c.2-.1.300.1.200.2l-6.800 6.200-.3 3.100-1.500-4.400Z" />
  </svg>
)
export const WhatsAppIcon = ({ className, ...p }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={sized(className, 'size-6')} {...p}>
    <circle cx="12" cy="12" r="11" fill="#3cb55a" />
    <path fill="#fff" d="M12 5.500a6.500 6.500 0 0 0-5.600 9.700l-.9 3.300 3.400-.9A6.500 6.500 0 1 0 12 5.500Zm3.700 9c-.2.4-.9.800-1.300.8-.7.100-1.100.1-3.200-.8-2.100-1-3.400-3.200-3.500-3.300-.1-.1-.8-1.100-.8-2s.5-1.400.7-1.600c.2-.2.400-.2.600-.2h.4c.1 0 .3 0 .5.4l.6 1.500c.1.100.1.300 0 .4l-.3.400c-.1.100-.2.300-.1.400.4.700.9 1.200 1.500 1.700.7.500 1.100.6 1.300.7.200.1.300.1.400-.1l.5-.6c.1-.2.300-.2.500-.1l1.400.7c.2.100.4.200.4.300.1.100.1.600-.1 1Z" />
  </svg>
)
export const PhoneWavesIcon = ({ className, ...p }) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className={sized(className, 'size-10')} fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" {...p}>
    <rect x="14" y="6" width="20" height="36" rx="4" />
    <path d="M22 37h4" />
    <path d="M8 15c-1.500 2.200-1.500 5.800 0 8m-4-11c-2.600 3.800-2.600 10.200 0 14M40 15c1.500 2.200 1.500 5.800 0 8m4-11c2.600 3.800 2.600 10.200 0 14" />
  </svg>
)
export const SparkleIcon = ({ className, ...p }) => (
  <svg viewBox="0 0 40 40" aria-hidden="true" className={sized(className, 'size-10')} fill="none" stroke="currentColor" strokeWidth="1.400" strokeLinecap="round" {...p}>
    <path d="M30 6l-2 6M36 14l-6 1M24 3l2 4M8 32l5-4M4 26l6 1M12 37l1-5" />
  </svg>
)
export const BoltIcon = (p) => (
  <Svg strokeWidth="1.8" {...p}>
    <path d="M13 2.500 5 13.500h6l-1 8 8-11h-6l1-8Z" />
  </Svg>
)
