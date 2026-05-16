import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/market-updates', label: 'Market Updates' },
  { to: '/premium', label: 'Premium' },
  { to: '/youtube-live', label: 'YouTube Live' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-800/95 backdrop-blur-md border-b border-white/5 shadow-xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-display font-bold text-white text-sm group-hover:bg-brand-400 transition-colors">T</div>
            <span className="font-display font-bold text-white text-lg">TradeMentor <span className="gradient-text">Pro</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'text-brand-400 bg-brand-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`
              }>{link.label}</NavLink>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {isAdmin && <Link to="/admin" className="text-xs text-brand-400 border border-brand-500/30 px-3 py-1.5 rounded-lg hover:bg-brand-500/10 transition-colors">Admin</Link>}
                <Link to="/dashboard" className="text-sm text-slate-300 hover:text-white transition-colors">{user.name.split(' ')[0]}</Link>
                <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-slate-400 hover:text-white">
            <div className={`w-5 h-0.5 bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mt-1 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mt-1 transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-dark-800/98 backdrop-blur-md border-t border-white/5 px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)} end={link.to === '/'}
                className={({ isActive }) => `px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'text-brand-400 bg-brand-500/10' : 'text-slate-400'}`}
              >{link.label}</NavLink>
            ))}
            <div className="border-t border-white/5 mt-2 pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="btn-secondary text-sm text-center">Admin Dashboard</Link>}
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="btn-ghost text-sm text-center">My Dashboard</Link>
                  <button onClick={handleLogout} className="btn-secondary text-sm">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-ghost text-sm text-center">Login</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary text-sm text-center">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
