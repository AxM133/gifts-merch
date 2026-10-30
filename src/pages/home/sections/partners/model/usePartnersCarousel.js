import { partners } from '@/entities/partner'
import { useCycle } from '@/shared/lib'

export const PARTNERS_VISIBLE = 5

export function usePartnersCarousel() {
  const cycle = useCycle(partners.length)
  const visible = Array.from(
    { length: Math.min(PARTNERS_VISIBLE, partners.length) },
    (_, i) => partners[(cycle.index + i) % partners.length],
  )
  return { ...cycle, visible }
}
