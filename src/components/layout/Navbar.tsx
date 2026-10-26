import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { cn } from '../../utils/cn';

const NAV_LINKS = [
  { label: 'Product', href: '#features' },
  { label: 'Solutions', href: '#bento' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Only update state when necessary
    if (latest > 20 !== scrolled) setScrolled(latest > 20);
    
    const isVisible = latest < previous || latest < 60;
    if (isVisible !== visible) setVisible(isVisible);
  });

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={cn(
              'fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500',
              scrolled
                ? 'mx-4 mt-3 rounded-2xl px-5 py-3 backdrop-blur-md md:backdrop-blur-2xl bg-white/[0.04] border border-white/[0.06] shadow-lg shadow-black/30'
                : 'px-8 py-5 border border-transparent'
            )}
          >
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group" aria-label="Nexus Home">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-900/50 group-hover:shadow-purple-600/50 transition-shadow duration-300">
                <Zap size={16} className="text-white" fill="white" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="font-semibold text-[15px] tracking-tight text-white">
                Nexus
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#"
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium px-3 py-2"
              >
                Sign in
              </a>
              <MagneticButton variant="primary" className="text-sm px-5 py-2.5">
                Get started
              </MagneticButton>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white/70 hover:text-white transition-colors p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl backdrop-blur-md bg-black/80 border border-white/10 p-5 shadow-2xl md:hidden"
          >
            <nav className="flex flex-col gap-1 mb-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-3 text-sm text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <a href="#" className="text-sm text-white/60 hover:text-white text-center py-2">Sign in</a>
              <MagneticButton variant="primary" className="w-full justify-center">Get started</MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}