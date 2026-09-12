import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Accueil',     href: '#accueil' },
  { label: 'Programme',   href: '#programme' },
  { label: 'Partenaires', href: '#partenaires' },
  { label: 'Galerie',     href: '#galerie' },
  { label: 'Contact',     href: '#contact' },
]

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-soutarah-dark/95 backdrop-blur-md shadow-lg border-b border-soutarah-gold/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Soutarah — gauche */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-soutarah-gold/70 shadow-gold overflow-hidden bg-soutarah-green-dark">
              <span className="font-heading font-black text-soutarah-gold text-lg leading-none">SG</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-white text-sm leading-tight">SOUTARAH</p>
              <p className="text-soutarah-gold text-xs tracking-widest uppercase">Group</p>
            </div>
          </div>

          {/* Centre — titre */}
          <div className="hidden md:flex flex-col items-center">
            <p className="text-soutarah-gold/80 uppercase tracking-[0.25em] text-xs font-semibold">
              Cérémonie Officielle
            </p>
            <p className="font-heading text-white font-bold text-sm tracking-wider">
              DE REMISE DE FINANCEMENT
            </p>
          </div>

          {/* Logo BNI — droite (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="font-heading font-bold text-white text-sm leading-tight">BNI</p>
              <p className="text-soutarah-gold text-xs tracking-widest uppercase">Partenaire</p>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-soutarah-gold/70 shadow-gold overflow-hidden bg-soutarah-green-dark">
              <span className="font-heading font-black text-soutarah-gold text-lg leading-none">BNI</span>
            </div>
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden text-soutarah-gold p-2"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center justify-center gap-8 pb-3">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-soutarah-gold transition-colors duration-300 text-sm font-medium tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-soutarah-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>

      {/* Nav mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-soutarah-dark/98 border-t border-soutarah-gold/20"
          >
            <div className="flex flex-col items-center gap-4 py-6">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/90 hover:text-soutarah-gold transition-colors duration-300 text-base font-medium tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
