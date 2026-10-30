export function PartnerLogo({ partner }) {
  return (
    <div className="flex h-24 items-center justify-center px-4">
      <img
        src={partner.logo}
        alt={partner.name}
        loading="lazy"
        className="max-h-full max-w-full object-contain opacity-90 transition duration-500 hover:scale-110 hover:opacity-100"
      />
    </div>
  )
}
