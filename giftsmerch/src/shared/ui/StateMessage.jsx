import { Button } from './Button'
import { cn } from '../lib'

export function StateMessage({ title, text, onRetry, retryLabel = 'Повторить', tone = 'neutral', className }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn('animate-fade-in rounded-[1.5rem] px-6 py-14 text-center', tone === 'error' ? 'bg-[#fdf0f1]' : 'bg-mist/60', className)}
    >
      <p className="text-[1.3rem] font-semibold">{title}</p>
      {text && <p className="mx-auto mt-2 max-w-md text-[0.9rem] text-body">{text}</p>}
      {onRetry && (
        <Button variant="brand" onClick={onRetry} className="mt-6">
          {retryLabel}
        </Button>
      )}
    </div>
  )
}
