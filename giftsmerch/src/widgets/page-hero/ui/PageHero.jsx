import { Breadcrumbs, Wave } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { HERO_MIN_HEIGHT, mediaStyle } from '../model/presets'

const FADE_MASK = {
  WebkitMaskImage:
    'linear-gradient(to right, transparent 0, #000 12%, #000 90%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 5%)',
  maskImage:
    'linear-gradient(to right, transparent 0, #000 12%, #000 90%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 5%)',
  WebkitMaskComposite: 'source-in',
  maskComposite: 'intersect',
}

export function PageHero({
  breadcrumbs,
  title,
  text,
  actions,
  extra,
  media,
  waveClassName = 'text-page',
  className,
  titleClassName,
}) {
  return (
    <section
      data-testid="page-hero"
      className={cn('hero-surface relative isolate overflow-hidden', className)}
      style={{ '--hero-min': HERO_MIN_HEIGHT }}
    >
      <div className="section-x relative z-10 mx-auto max-w-[1920px] pt-[11.5rem] pb-28 lg:min-h-[var(--hero-min)] lg:pt-[19.4rem] lg:pb-40">
        <div className="max-w-[46rem] animate-fade-up">
          {breadcrumbs ? (
            <Breadcrumbs items={breadcrumbs} className="mb-5" />
          ) : (
            <div className="hidden h-[2.1rem] lg:block" />
          )}
          <h1
            className={cn(
              'text-[1.9rem] leading-[1.12] font-extrabold tracking-tight text-ink uppercase sm:text-[2.4rem] lg:text-[3.1rem]',
              titleClassName,
            )}
          >
            {title}
          </h1>
          {text && <div className="mt-6 max-w-[38rem] text-[1rem] leading-snug text-body lg:text-[1.15rem]">{text}</div>}
          {actions && <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">{actions}</div>}
          {extra}
        </div>
      </div>

      {media && (
        <div
          style={mediaStyle(media.preset)}
          className={cn(
            'relative z-0 mx-auto -mt-16 w-[min(30rem,86%)] pb-10 animate-fade-up [animation-delay:200ms] lg:absolute lg:top-[var(--hero-top)] lg:left-[var(--hero-left)] lg:mt-0 lg:w-[var(--hero-w)] lg:max-w-none lg:pb-0',
          )}
        >
          <img
            src={media.src}
            alt={media.alt ?? ''}
            fetchPriority="high"
            style={media.rounded ? undefined : FADE_MASK}
            className={cn(
              'block h-auto w-full animate-float-soft select-none',
              media.rounded && 'rounded-[1.5rem] shadow-[0_30px_60px_-30px_rgb(39_37_37/0.5)]',
            )}
            draggable="false"
          />
        </div>
      )}

      <Wave variant="a" className={cn('absolute -bottom-px left-0 z-20 h-[6rem] lg:h-[8.4rem]', waveClassName)} />
    </section>
  )
}
