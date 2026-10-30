import { Modal, Skeleton, StateMessage } from '@/shared/ui'
import { useQuickViewProduct } from '../model/useQuickViewProduct'
import { ModalGallery } from './ModalGallery'
import { ModalInfo } from './ModalInfo'

function ModalSkeleton() {
  return (
    <div aria-busy="true" aria-label="Загрузка товара" className="grid gap-8 lg:grid-cols-[28rem_1fr] lg:gap-[2.6rem]">
      <Skeleton className="aspect-[375/450] rounded-[1rem]" />
      <div className="space-y-5">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-16 w-5/6" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-24 w-3/4" />
        <Skeleton className="h-12 w-56" />
      </div>
    </div>
  )
}

export function ProductModal() {
  const view = useQuickViewProduct()
  return (
    <Modal
      open={view.open}
      onClose={view.close}
      label={view.product?.title ?? 'Товар'}
      panelClassName="max-w-[76rem] p-6 pt-14 sm:p-10"
    >
      {view.error ? (
        <StateMessage
          tone="error"
          title={view.notFound ? 'Товар не найден' : 'Не удалось загрузить товар'}
          onRetry={view.notFound ? undefined : view.refetch}
        />
      ) : view.product ? (
        <div key={view.product.id} className="grid gap-8 lg:grid-cols-[28rem_1fr] lg:gap-[2.6rem]">
          <ModalGallery product={view.product} />
          <ModalInfo product={view.product} onClose={view.close} />
        </div>
      ) : (
        <ModalSkeleton />
      )}
    </Modal>
  )
}
