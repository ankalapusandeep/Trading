import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '⬡', end: true },
  { to: '/admin/users', label: 'Users', icon: '👥' },
  { to: '/admin/market-updates', label: 'Market Updates', icon: '📊' },
  { to: '/admin/plans', label: 'Pricing Plans', icon: '💎' },
  { to: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
  { to: '/admin/messages', label: 'Messages', icon: '✉' },
  { to: '/admin/payments', label: 'Payments', icon: '💳' },
];

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-dark-800 border-r border-white/5 flex flex-col transition-all duration-300 min-h-screen sticky top-0`}>
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2 px-4'} py-5 border-b border-white/5`}>
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-display font-bold text-white text-sm shrink-0">T</div>
        {!collapsed && <span className="font-display font-bold text-white text-sm">TradeMentor<span className="gradient-text"> Pro</span></span>}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${isActive ? 'bg-brand-500/15 text-brand-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`
            }>
            <span className="text-base shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={`border-t border-white/5 p-3 space-y-2`}>
        <NavLink to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 text-sm transition-all">
          <span>🏠</span>{!collapsed && <span>View Site</span>}
        </NavLink>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/5 text-sm transition-all">
          <span>↩</span>{!collapsed && <span>Logout</span>}
        </button>
        <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-400 text-xs transition-all">
          <span>{collapsed ? '→' : '←'}</span>{!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
