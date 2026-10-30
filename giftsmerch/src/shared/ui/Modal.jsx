import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn, usePresence } from '../lib'
import { CloseIcon } from './icons'

export function Modal({ open, onClose, label, children, className, panelClassName }) {
  const { mounted, visible } = usePresence(open, 280)
  const panelRef = useRef(null)

  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return undefined
    const previous = document.activeElement
    const onKey = (event) => {
      if (event.key === 'Escape') onCloseRef.current?.()
    }
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const focusId = setTimeout(() => {
      const panel = panelRef.current
      if (panel && !panel.contains(document.activeElement)) panel.focus({ preventScroll: true })
    }, 30)
    return () => {
      clearTimeout(focusId)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [open])

  if (!mounted) return null

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-[100] grid place-items-start overflow-y-auto px-4 py-10 transition-opacity duration-300 sm:py-[4.5rem]',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      <div
        data-testid="modal-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-ink/55 backdrop-blur-[3px]"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          'relative mx-auto w-full rounded-[2rem] bg-page shadow-[0_40px_90px_-30px_rgb(0_0_0/0.55)] outline-none transition duration-300 ease-out-expo',
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-[0.97] opacity-0',
          panelClassName,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-5 right-5 z-10 grid size-11 place-items-center rounded-full border-[3px] border-ink text-ink transition duration-300 hover:rotate-90 hover:bg-ink hover:text-white"
        >
          <CloseIcon className="size-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
