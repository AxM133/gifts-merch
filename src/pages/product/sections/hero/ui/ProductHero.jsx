import { PageHero } from '@/widgets/page-hero'
import { ProductHeroActions } from './ProductHeroActions'

export function ProductHero({ product, breadcrumbs }) {
  return (
    <PageHero
      key={product.id}
      breadcrumbs={breadcrumbs}
      title={product.title}
      titleClassName="text-[1.7rem] sm:text-[2rem] lg:text-[2.4rem]"
      text={product.description}
      actions={<ProductHeroActions product={product} />}
      media={{ preset: 'jacket', src: product.images[0], alt: product.title, rounded: true }}
    />
  )
}
