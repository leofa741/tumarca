'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { MessageCircle, X, Menu, Sparkles } from 'lucide-react'

// ============================================================================
// COMPONENTE AUXILIAR: ScrollProgress (SSR Safe)
// ============================================================================
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 z-[60] origin-left"
      style={{ scaleX }}
    />
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL: Header
// ============================================================================
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const pathname = usePathname()
  const headerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)'])
  const headerBlur = useTransform(scrollY, [0, 100], ['12px', '20px'])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.95])

  // Spring animation for smooth values
  const springConfig = { damping: 25, stiffness: 150, mass: 0.1 }
  const headerBgSpring = useSpring(headerBg, springConfig)
  const headerBlurSpring = useSpring(headerBlur, springConfig)

  // Detect scroll for header style change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [menuOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/desarrollo-web', label: 'Web' },
    { href: '/sistema-de-control-de-acceso', label: 'Gym' },
    { href: '/machine-learning', label: 'LLM' },
    { href: '/ia-estrategica-para-marcas', label: 'IA' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/chat-ai', label: 'Chat AI' },
    { href: '/contact', label: 'Contact' },
  ]

  // Magnetic hover effect hook
  const useMagnetic = (strength = 50) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = (e.clientX - centerX) / strength
      const dy = (e.clientY - centerY) / strength
      x.set(dx)
      y.set(dy)
    }

    const onMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    return { x, y, onMouseMove, onMouseLeave }
  }

  return (
    <>
      {/* Aurora Background Animation - Único y espectacular */}
      <style jsx global>{`
        @keyframes aurora {
          0%, 100% { background-position: 0% 50%, 100% 50%, 50% 50% }
          50% { background-position: 100% 50%, 0% 50%, 50% 100% }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) }
          50% { transform: translateY(-10px) }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.4) }
          50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.8), 0 0 60px rgba(59, 130, 246, 0.4) }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
        }
        .aurora-bg {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
          background-size: 200% 200%, 200% 200%, 200% 200%;
          animation: aurora 18s ease infinite;
          filter: blur(40px);
          opacity: 0.6;
          pointer-events: none;
        }
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
        }
        .nav-mask {
          position: relative;
          overflow: hidden;
        }
        .nav-mask::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .nav-mask:hover::before {
          transform: translateX(100%);
        }
      `}</style>

      {/* Scroll Progress Bar - SSR Safe ✨ */}
      <ScrollProgress />

      {/* Header Principal */}
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: headerBgSpring,
          backdropFilter: `blur(${headerBlurSpring})`,
          WebkitBackdropFilter: `blur(${headerBlurSpring})`,
        }}
      >
        {/* Aurora Effect Layer */}
        <div className="absolute inset-0 aurora-bg" />
        <div className="absolute inset-0 noise-overlay" />

        {/* Gradient Border Bottom - Elegante y sutil */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: useTransform(scrollY, [0, 100], [
              'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)',
              'linear-gradient(90deg, transparent, rgba(249,115,22,0.6), transparent)'
            ])
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo con animación magnética */}
            <motion.div style={{ scale: logoScale }} className="relative z-10">
              <Link href="/" className="block group">
                <div className="relative">
                  <Image
                    src="/marca-2-ar-removebg.png"
                    width={70}
                    height={70}
                    priority
                    loading="eager"
                    draggable="false"
                    quality={100}
                    placeholder="blur"
                    blurDataURL="/marca-2-ar-removebg.png"
                    alt="TUMARCA.AR Logo"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Efecto "Reveal" único */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map(({ href, label }, index) => {
                const isActive = pathname === href
                const magnetic = useMagnetic(30)

                return (
                  <motion.div
                    key={href}
                    className="relative px-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <motion.button
                      {...magnetic}
                      style={{ x: magnetic.x, y: magnetic.y }}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(-1)}
                      className="relative py-2 px-1 nav-mask"
                    >
                      <Link
                        href={href}
                        className={`relative text-sm font-medium tracking-wide transition-colors duration-300
                          ${isActive
                            ? 'text-white'
                            : 'text-gray-400 hover:text-white'
                          }
                        `}
                      >
                        {/* Animated gradient underline - sigue al cursor */}
                        {isActive && (
                          <motion.span
                            layoutId="activeNav"
                            className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}

                        {/* Text reveal effect */}
                        <span className="relative z-10 flex items-center gap-1">
                          <motion.span
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-orange-400"
                            animate={{ opacity: activeIndex === index ? 1 : 0 }}
                          >
                            ⟨
                          </motion.span>
                          {label}
                          <motion.span
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-orange-400"
                            animate={{ opacity: activeIndex === index ? 1 : 0 }}
                          >
                            ⟩
                          </motion.span>
                        </span>
                      </Link>
                    </motion.button>
                  </motion.div>
                )
              })}

              {/* WhatsApp Button - Floating con pulse */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="ml-4"
              >
                <motion.a
                  href="https://wa.me/541141461312?text=Hola%20Tu%20Marca%20AR%2C%20estoy%20interesado%20en%20potenciar%20mi%20marca.%20¿Podemos%20agendar%20una%20llamada?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group flex items-center gap-2.5 px-5 py-2.5 rounded-full font-medium text-sm overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(37, 211, 102, 0)",
                      "0 0 25px rgba(37, 211, 102, 0.5)",
                      "0 0 0 rgba(37, 211, 102, 0)"
                    ]
                  }}
                  transition={{
                    boxShadow: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
                  }}
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#075E54] opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  <MessageCircle className="w-4.5 h-4.5 text-white relative z-10" />
                  <span className="text-white relative z-10">WhatsApp</span>

                  {/* Sparkle effect */}
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300 drop-shadow-lg" />
                  </motion.div>
                </motion.a>
              </motion.div>
            </nav>

            {/* Mobile Menu Toggle - Animación única */}
            <motion.button
              className="lg:hidden relative z-10 p-2 rounded-xl hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay - Full screen con animaciones staggered */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop con blur y gradiente */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Aurora móvil */}
            <div className="absolute inset-0 aurora-bg opacity-40" />

            {/* Contenido del menú */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative h-full flex flex-col px-6 pt-24 pb-8"
            >
              {/* Logo móvil */}
              <div className="absolute top-6 left-6">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <Image
                    src="/marca-2-ar-removebg.png"
                    width={55}
                    height={55}
                    alt="TUMARCA.AR"
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  />
                </Link>
              </div>

              {/* Nav Links con animación escalonada */}
              <nav className="flex-1 flex flex-col justify-center space-y-2">
                {navLinks.map(({ href, label }, index) => {
                  const isActive = pathname === href
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.07 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`block py-4 px-2 text-2xl font-bold tracking-tight transition-all duration-300 relative overflow-hidden group
                          ${isActive
                            ? 'text-white'
                            : 'text-gray-400 hover:text-white'
                          }
                        `}
                      >
                        {/* Gradient slide effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />

                        <span className="relative z-10 flex items-center gap-3">
                          <span className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg">→</span>
                          {label}
                        </span>

                        {/* Active indicator */}
                        {isActive && (
                          <motion.span
                            layoutId="mobileActive"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-orange-500 to-blue-500 rounded-r-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* WhatsApp Button móvil */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-6 border-t border-white/10"
              >
                <a
                  href="https://wa.me/541141461312?text=Hola%20Tu%20Marca%20AR%2C%20estoy%20interesado%20en%20potenciar%20mi%20marca.%20¿Podemos%20agendar%20una%20llamada?"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chatear por WhatsApp</span>
                </a>
              </motion.div>

              {/* Decorative floating elements */}
              <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none">
                <motion.div
                  className="absolute w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-10 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"
                  animate={{
                    x: [0, -20, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}