import { Navigate } from 'react-router'
import { LeadBanner } from '@/widgets/lead-banner'
import { PageHero } from '@/widgets/page-hero'
import { ProductShowcase } from '@/widgets/product-catalog'
import { ROUTES } from '@/shared/config'
import { usePageTitle } from '@/shared/lib'
import { Button, Skeleton } from '@/shared/ui'
import { useProductPage } from '../model/useProductPage'
import { ProductHero } from '../sections/hero'
import { SeoText } from '../sections/seo'

function ProductPageSkeleton() {
  return (
    <PageHero
      title={
        <>
          <span className="sr-only">Загрузка товара…</span>
          <Skeleton className="h-[7rem] w-[34rem] max-w-full" />
        </>
      }
      text={<Skeleton className="h-[5rem] w-[30rem] max-w-full" />}
    />
  )
}

export function ProductPage() {
  const page = useProductPage()
  usePageTitle(page.product?.title)

  if (page.status === 'notFound') return <Navigate to={ROUTES.products} replace />
  if (page.status === 'loading') return <ProductPageSkeleton />
  if (page.status === 'error') {
    return (
      <PageHero
        title="Не удалось загрузить товар"
        text="Проверьте, что локальный сервер запущен (npm run dev)."
        actions={
          <Button variant="brand" onClick={page.refetch}>
            Повторить
          </Button>
        }
      />
    )
  }

  return (
    <>
      <ProductHero product={page.product} breadcrumbs={page.breadcrumbs} />
      <ProductShowcase
        id="similar"
        title="Похожие товары"
        items={page.similar}
        loading={page.similarLoading}
        error={page.similarError}
        onRetry={page.refetch}
        pageSize={4}
      />
      <SeoText />
      <LeadBanner variant="plain" />
    </>
  )
}
