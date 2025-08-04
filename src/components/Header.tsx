'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  // Función para cerrar el menú al hacer clic en un enlace
  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <header className="w-full bg-black text-white shadow z-50 fixed top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link href="/" className="block" onClick={handleLinkClick}>
            <Image
              src="/logo-n.png"
              width={70}
              height={70}
              priority
              loading="eager"
              draggable="false"
              quality={100}
              placeholder="blur"
              blurDataURL="/logo-n.png"
              alt="TUMARCA.AR Logo"
            />
          </Link>

          {/* Botón menú móvil */}
          <button
            className="lg:hidden ml-auto text-white hover:text-gray-400 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            <span className="sr-only">{menuOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navegación escritorio (oculta en móvil) */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-light tracking-wide">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`relative group text-sm font-black uppercase tracking-wide transition-colors duration-300
                  ${isActive ? 'text-white' : 'text-gray-400 hover:text-orange-500'}
                  ${isActive ? 'after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-orange-500' : ''}
                  ${isActive ? 'after:transition-all after:duration-300' : ''}
                  ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'}
                  after:origin-left after:transform after:content-[''] after:z-[-1]
                `}
              >
                <span className="relative z-10">
                  <span className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">[</span>
                  {label}
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">]</span>
                </span>
              </Link>
            )
          })}

          <a
            href="https://wa.me/541141461312?text=Hola%20Tu%20Marca%20AR%2C%20estoy%20interesado%20en%20potenciar%20mi%20marca.%20¿Podemos%20agendar%20una%20llamada?"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 1.998-1.413.24-.694.24-1.289.165-1.413-.075-.124-.272-.198-.57-.347z" />
            </svg>
            WhatsApp
          </a>
        </nav>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="lg:hidden bg-black text-white px-4 pb-6 shadow-md">
          <nav className="flex flex-col space-y-4 text-sm font-light tracking-wide">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={handleLinkClick} // ✅ Cierra el menú al hacer clic
                  className={`relative group text-sm font-black tracking-wide transition-colors duration-300
                    ${isActive ? 'text-white' : 'text-gray-400 hover:text-orange-500'}
                  `}
                >
                  <span className="relative z-10">
                    <span className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">[</span>
                    {label}
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">]</span>
                  </span>
                </Link>
              )
            })}

            <a
              href="https://wa.me/541141461312?text=Hola%20Tu%20Marca%20AR%2C%20estoy%20interesado%20en%20potenciar%20mi%20marca.%20¿Podemos%20agendar%20una%20llamada?"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick} // ✅ Opcional: también cierra al hacer clic en WhatsApp
              className="flex items-center gap-2 text-sm font-medium bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 1.998-1.413.24-.694.24-1.289.165-1.413-.075-.124-.272-.198-.57-.347z" />
              </svg>
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}