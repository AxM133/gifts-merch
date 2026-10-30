import { useParams } from 'react-router'
import { getSewingItem } from './items'

export function useSewingItem() {
  const { slug } = useParams()
  return getSewingItem(slug)
}
