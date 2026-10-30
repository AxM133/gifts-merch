import { Link } from 'react-router'

export function CategoryTile({ to, label, image }) {
  return (
    <Link to={to} className="group block text-center">
      <span className="block aspect-[283/188] overflow-hidden rounded-[1.5rem] bg-[#e6e6e6] shadow-card transition duration-500 ease-out-expo group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_40px_-22px_rgb(63_49_114/0.45)]">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.08]"
        />
      </span>
      <span className="mt-4 block text-[1.45rem] font-medium text-ink transition-colors group-hover:text-brand">
        {label}
      </span>
    </Link>
  )
}
