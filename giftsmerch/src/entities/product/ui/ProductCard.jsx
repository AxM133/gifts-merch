import { useState } from 'react'
import { Link } from 'react-router'
import { BasketIcon, SliderArrows, StarIcon } from '@/shared/ui'
import { cn, formatPrice } from '@/shared/lib'
import { ROUTES } from '@/shared/config'
import { useProductGallery } from '../model/useProductGallery'
import { ColorDots } from './ColorDots'

export function ProductCard({ product, onOpen, onAdd, className }) {
  const gallery = useProductGallery(product)
  const [color, setColor] = useState(product.colors[0])

  return (
    <article
      data-testid="product-card"
      className={cn(
        'group flex flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-card transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_26px_44px_-22px_rgb(63_49_114/0.4)]',
        className,
      )}
    >
      <div className="relative aspect-[377/390] overflow-hidden bg-[#f0f1f8]">
        <button
          type="button"
          onClick={() => onOpen?.(product)}
          aria-label={`Быстрый просмотр: ${product.title}`}
          className="absolute inset-0 block size-full cursor-zoom-in"
        >
          <img
            key={gallery.image}
            src={gallery.image}
            alt={product.title}
            loading="lazy"
            className={cn(
              'size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]',
              gallery.direction === 'next' ? 'animate-slide-next' : 'animate-slide-prev',
            )}
          />
        </button>
        {product.featured && (
          <StarIcon className="absolute top-3 right-3 size-8 animate-pop text-mint" />
        )}
        <SliderArrows
          className="absolute right-3 bottom-2"
          label="кадр"
          current={gallery.index}
          total={gallery.total}
          onPrev={gallery.prev}
          onNext={gallery.next}
        />
      </div>

      <div className="flex flex-1 flex-col px-[1.1rem] pt-4 pb-[1.1rem]">
        <h3 className="text-[1.35rem] leading-[1.15] font-medium text-ink">
          <Link to={ROUTES.product(product.id)} className="transition-colors hover:text-brand">
            {product.title}
          </Link>
        </h3>
        <p className="mt-2 max-w-[16rem] text-[0.7rem] leading-tight text-ink/80">{product.subtitle}</p>
        <ColorDots
          colors={product.colors}
          selected={color.hex}
          onSelect={(hex) => setColor(product.colors.find((c) => c.hex === hex))}
          className="mt-3"
        />
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="text-[1.45rem] leading-[1.05] font-medium text-[#b7b4bd]">
            From Price
            <br />
            <span>{formatPrice(product.price)}</span>
          </p>
          <button
            type="button"
            onClick={() => onAdd?.(product, { color })}
            aria-label={`Добавить в корзину: ${product.title}, ${color.name}`}
            className="grid size-14 place-items-center rounded-full text-ink transition duration-300 hover:scale-110 hover:text-mint active:scale-90"
          >
            <BasketIcon className="size-[2.6rem]" />
          </button>
        </div>
      </div>
    </article>
  )
}
