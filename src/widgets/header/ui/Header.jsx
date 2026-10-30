import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { MainNav } from './MainNav'
import { MobileMenu } from './MobileMenu'
import { PromoStrip } from './PromoStrip'
import { TopBar } from './TopBar'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const id = setTimeout(() => setMenuOpen(false), 0)
    return () => clearTimeout(id)
  }, [pathname])

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <TopBar
        burger={<MobileMenu open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} onClose={() => setMenuOpen(false)} />}
      />
      <div className="relative hidden h-[6.25rem] bg-white/45 backdrop-blur-[2px] lg:block">
        <div className="section-x mx-auto h-full w-full max-w-[1920px]">
          <MainNav />
        </div>
        <PromoStrip />
      </div>
    </header>
  )
}
