import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-display font-bold text-white text-sm">T</div>
              <span className="font-display font-bold text-white text-lg">TradeMentor <span className="gradient-text">Pro</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              A professional trading education community providing market insights, technical analysis, and mentorship for Indian stock market traders.
            </p>
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-amber-400 text-xs font-medium">⚠️ Risk Disclaimer</p>
              <p className="text-amber-300/70 text-xs mt-1">Trading involves risk. We do not guarantee profits. All content is for educational purposes only.</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[['/', 'Home'], ['/about', 'About'], ['/market-updates', 'Market Updates'], ['/premium', 'Premium Channel'], ['/pricing', 'Pricing Plans']].map(([to, label]) => (
                <Link key={to} to={to} className="text-slate-400 hover:text-brand-400 text-sm transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="https://youtube.com/@optionedge9" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-400 text-sm transition-colors flex items-center gap-2">
                <span className="text-red-500">▶</span> YouTube Channel
              </a>
              <a href="https://t.me/optionedgetelugu" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2">
                <span className="text-blue-500">✈</span> Free Telegram
              </a>
              <a href="https://t.me/tradementorpro_premium" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-400 text-sm transition-colors flex items-center gap-2">
                <span className="text-brand-500">★</span> Premium Telegram
              </a>
              <Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                <span>✉</span> Contact Us
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} TradeMentor Pro. All rights reserved.</p>
          <p className="text-slate-600 text-xs">SEBI Registration not held. Content is educational only.</p>
        </div>
      </div>
    </footer>
  );
}
