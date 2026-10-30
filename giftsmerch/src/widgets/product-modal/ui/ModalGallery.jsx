import { useProductGallery } from '@/entities/product'
import { ChevronIcon } from '@/shared/ui'
import { cn } from '@/shared/lib'

export function ModalGallery({ product }) {
  const gallery = useProductGallery(product)
  const arrow =
    'absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand shadow-md transition duration-300 hover:scale-110 hover:bg-white active:scale-95'
  const thumbs = product.images.slice(0, 3)
  return (
    <div>
      <div className="relative aspect-[375/450] overflow-hidden rounded-[1rem] bg-[#f0f1f8]">
        <img
          key={gallery.image}
          src={gallery.image}
          alt={product.title}
          className={cn('size-full object-cover', gallery.direction === 'next' ? 'animate-slide-next' : 'animate-slide-prev')}
        />
        <button type="button" aria-label="Предыдущее фото" onClick={gallery.prev} className={cn(arrow, 'left-4')}>
          <ChevronIcon direction="left" className="size-5" />
        </button>
        <button type="button" aria-label="Следующее фото" onClick={gallery.next} className={cn(arrow, 'right-4')}>
          <ChevronIcon direction="right" className="size-5" />
        </button>
      </div>
      <ul className="mt-3 flex gap-2">
        {thumbs.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              aria-label={`Фото ${i + 1}`}
              aria-current={gallery.index === i}
              onClick={() => gallery.goTo(i)}
              className={cn(
                'block size-[4.7rem] overflow-hidden rounded-md bg-[#f0f1f8] ring-2 ring-offset-2 transition duration-300 hover:scale-105',
                gallery.index === i ? 'ring-brand' : 'ring-transparent',
              )}
            >
              <img src={src} alt="" className="size-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
