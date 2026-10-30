import { useCycle } from '@/shared/lib'
import { customItems, VISIBLE_ITEMS } from './content'

export function useCustomSlider() {
  const cycle = useCycle(customItems.length)
  const visible = Array.from({ length: VISIBLE_ITEMS }, (_, i) => customItems[(cycle.index + i) % customItems.length])
  return { ...cycle, visible, total: customItems.length }
}
