import { z } from 'zod'

const partnerSchema = z.object({ id: z.string(), name: z.string(), logo: z.string() })

export const partners = z.array(partnerSchema).parse([
  { id: 'nike', name: 'Nike', logo: '/images/partner-nike.png' },
  { id: 'cocacola', name: 'Coca-Cola', logo: '/images/partner-cocacola.png' },
  { id: 'atlas', name: 'Atlas Weekend', logo: '/images/partner-atlas.png' },
  { id: 'megogo', name: 'Megogo', logo: '/images/partner-megogo.png' },
  { id: 'crazybox', name: 'Crazybox', logo: '/images/partner-crazybox.png' },
])
