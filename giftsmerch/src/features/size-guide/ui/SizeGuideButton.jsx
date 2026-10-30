import { useState } from 'react'
import { Modal, RulerIcon } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { SizeChartTable } from './SizeChartTable'

export function SizeGuideButton({ className }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center gap-2 text-[0.8rem] text-brand underline underline-offset-2 transition-colors hover:text-violet',
          className,
        )}
      >
        <RulerIcon className="size-4" />
        Подобрать размер
      </button>
      <Modal open={open} onClose={() => setOpen(false)} label="Таблица размеров" panelClassName="max-w-[44rem] p-8 pt-16">
        <SizeChartTable />
      </Modal>
    </>
  )
}
