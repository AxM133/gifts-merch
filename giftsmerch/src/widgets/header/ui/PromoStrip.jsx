import { Link } from 'react-router'
import { promo } from '../model/nav'

export function PromoStrip() {
  return (
    <Link
      to={promo.to}
      className="group absolute inset-y-0 right-[4.7vw] hidden items-center gap-[1.4rem] xl:flex"
    >
      <span className="text-[2.15rem] leading-none font-extrabold tracking-tight text-violet uppercase transition-transform duration-500 ease-out-expo group-hover:-translate-x-1">
        {promo.text}
      </span>
      <img
        src={promo.image}
        alt=""
        className="h-full w-[9.5rem] object-cover opacity-90 transition duration-500 group-hover:scale-105"
      />
    </Link>
  )
}
