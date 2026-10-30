import { Container, Reveal, SliderArrows } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { customContent } from '../model/content'
import { useCustomSlider } from '../model/useCustomSlider'

export function CustomProduction() {
  const slider = useCustomSlider()
  return (
    <section className="relative overflow-hidden py-14 lg:py-[5.5rem]" aria-label="Производство под заказ">
      <span aria-hidden="true" className="pointer-events-none absolute top-[2rem] left-[4.4vw] hidden size-[11rem] rounded-full bg-mist lg:block" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[47fr_53fr] lg:gap-[2.4rem]">
        <Reveal direction="right" className="relative">
          <img
            src={customContent.image.src}
            alt={customContent.image.alt}
            loading="lazy"
            className="w-full rounded-[0.9rem] shadow-card"
          />
          <span aria-hidden="true" className="absolute -right-[2.2rem] -bottom-[1.8rem] -z-10 hidden size-[6rem] rounded-full bg-mist lg:block" />
        </Reveal>

        <div className="lg:pl-[1rem]">
          <Reveal>
            <h2 className="max-w-[47rem] text-[1.5rem] leading-[1.45] font-bold lg:text-[1.95rem]">{customContent.title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-[32rem] text-[1rem] leading-snug text-body">{customContent.text}</p>
          </Reveal>
          <Reveal delay={220} className="mt-9 flex items-center gap-5">
            <ul className="grid flex-1 grid-cols-4 gap-5" aria-label="Что мы производим">
              {slider.visible.map((item) => (
                <li
                  key={`${slider.index}-${item.id}`}
                  className={cn('text-center', slider.direction === 'next' ? 'animate-slide-next' : 'animate-slide-prev')}
                >
                  <span className="group mx-auto block size-[8.25rem] overflow-hidden rounded-full shadow-card">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="size-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-110"
                    />
                  </span>
                </li>
              ))}
            </ul>
            <SliderArrows label="набор" current={slider.index} total={slider.total} onPrev={slider.prev} onNext={slider.next} />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
