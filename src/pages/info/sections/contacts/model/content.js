import { SITE } from '@/shared/config'

export const contactsContent = {
  title: 'Контакты',
  email: SITE.email,
  phone: SITE.phone,
  phoneHref: SITE.phoneHref,
  messengers: [
    { id: 'viber', label: 'Viber', href: 'viber://chat?number=%2B380630130103' },
    { id: 'telegram', label: 'Telegram', href: 'https://t.me/' },
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/380630130103' },
  ],
  formTitle: 'Свяжитесь с нами',
  lead: 'Введите свои контактные данные, и наш менеджер свяжется с Вами',
  leadAccent: 'в течении 15 минут',
  successText: 'Менеджер свяжется с вами в течение 15 минут.',
}
