import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { marketAPI, testimonialAPI, pricingAPI } from '../services/api';
import PricingCard from '../components/common/PricingCard';
import DisclaimerBanner from '../components/common/DisclaimerBanner';
import toast from 'react-hot-toast';

const stats = [
  { label: 'Community Members', value: '12,000+' },
  { label: 'YouTube Subscribers', value: '45K+' },
  { label: 'Market Updates', value: '500+' },
  { label: 'Years Experience', value: '8+' },
];

const features = [
  { icon: '📈', title: 'Daily Trade Setups', desc: 'Technical analysis with clear entry, target, and stop-loss levels.' },
  { icon: '📊', title: 'Live YouTube Sessions', desc: 'Watch real-time market analysis during market hours.' },
  { icon: '🔔', title: 'Free Telegram Updates', desc: 'Get free market updates and alerts on our public channel.' },
  { icon: '💎', title: 'Premium Mentorship', desc: 'Exclusive F&O strategies and one-on-one portfolio reviews.' },
  { icon: '📚', title: 'Educational Content', desc: 'Learn trading fundamentals, chart patterns, and risk management.' },
  { icon: '🛡️', title: 'Risk Management First', desc: 'Every call comes with proper risk management guidance.' },
];

export default function Home() {
  const [updates, setUpdates] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [plans, setPlans] = useState([]);
  const [buyModal, setBuyModal] = useState(null);

  useEffect(() => {
    marketAPI.getAll({ limit: 3 }).then(r => setUpdates(r.data.updates)).catch(() => {});
    testimonialAPI.getAll().then(r => setTestimonials(r.data.testimonials.slice(0, 3))).catch(() => {});
    pricingAPI.getAll().then(r => setPlans(r.data.plans)).catch(() => {});
  }, []);

  const handleBuy = (plan) => {
    toast('Redirecting to payment...', { icon: '💳' });
  };

  return (
    <div className="min-h-screen">
      <DisclaimerBanner />

      {/* Hero */}
      <section className="relative min-h-screen mesh-bg chart-bg flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900" />
        
        {/* Floating elements */}
        <div className="absolute top-20 right-10 lg:right-20 opacity-20 animate-float">
          <div className="w-32 h-32 border border-brand-500/40 rounded-2xl rotate-12" />
        </div>
        <div className="absolute bottom-40 left-10 opacity-10 animate-float" style={{animationDelay:'2s'}}>
          <div className="w-20 h-20 border border-gold-400/40 rounded-full" />
        </div>

        {/* Ticker bar */}
        <div className="absolute top-16 left-0 right-0 overflow-hidden border-b border-white/5 bg-dark-800/50 backdrop-blur-sm py-2">
          <div className="flex gap-8 animate-[slideLeft_20s_linear_infinite] whitespace-nowrap">
            {['NIFTY50 22,456 ▲ +0.42%', 'BANKNIFTY 47,234 ▼ -0.18%', 'SENSEX 73,890 ▲ +0.35%', 'RELIANCE ₹2,890 ▲ +1.2%', 'TCS ₹4,120 ▼ -0.8%', 'HDFC ₹1,680 ▲ +0.5%', 'GOLD MCX ₹61,450 ▲ +0.3%', 'CRUDE OIL ₹6,780 ▼ -1.1%'].concat(['NIFTY50 22,456 ▲ +0.42%', 'BANKNIFTY 47,234 ▼ -0.18%', 'SENSEX 73,890 ▲ +0.35%']).map((t, i) => (
              <span key={i} className={`ticker-text text-xs ${t.includes('▲') ? 'text-green-400' : 'text-red-400'}`}>{t}</span>
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-brand-300 text-sm font-medium">Live Market Sessions Daily</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Learn to Trade
              <br />
              <span className="gradient-text">Like a Professional</span>
            </h1>

            <p className="mt-6 text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Join 12,000+ traders getting daily market analysis, live YouTube sessions, and premium trade setups. Education-first, risk-management always.
            </p>

            <div className="mt-4 inline-block bg-amber-900/30 border border-amber-500/20 rounded-lg px-4 py-2">
              <p className="text-amber-400/80 text-xs">⚠️ Trading involves risk. All content is for educational purposes only. We do not guarantee profits.</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://t.me/optionedgetelugu" target="_blank" rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center gap-2 text-base py-3.5 px-7">
                <span>✈</span> Join Free Telegram
              </a>
              <Link to="/youtube-live" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25 flex items-center justify-center gap-2 text-base">
                <span>▶</span> Watch YouTube Live
              </Link>
              <Link to="/premium" className="btn-primary flex items-center justify-center gap-2 text-base py-3.5 px-7">
                <span>💎</span> Join Premium
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="glass rounded-xl p-5 text-center hover:border-brand-500/20 transition-colors">
                <div className="font-display text-3xl font-bold gradient-text">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Everything You Need to <span className="gradient-text">Trade Smart</span></h2>
            <p className="section-subtitle">Comprehensive trading education and market insights — all in one place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="card group hover:bg-dark-400 cursor-default">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold text-lg group-hover:text-brand-400 transition-colors">{f.title}</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Market Updates */}
      {updates.length > 0 && (
        <section className="py-24 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="section-title">Latest <span className="gradient-text">Market Updates</span></h2>
                <p className="text-slate-400 mt-2">Free educational market analysis posts</p>
              </div>
              <Link to="/market-updates" className="btn-secondary text-sm hidden md:inline-flex">View All →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {updates.map((u) => (
                <div key={u._id} className="card group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge bg-brand-500/10 text-brand-400">{u.category}</span>
                    <span className="text-slate-500 text-xs">{new Date(u.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-brand-400 transition-colors">{u.title}</h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed line-clamp-3">{u.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/market-updates" className="btn-secondary">View All Updates</Link>
            </div>
          </div>
        </section>
      )}

      {/* Pricing preview */}
      {plans.length > 0 && (
        <section className="py-24 bg-dark-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">Premium <span className="gradient-text">Membership Plans</span></h2>
              <p className="section-subtitle">Choose a plan that fits your trading journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map(p => <PricingCard key={p._id} plan={p} onBuy={handleBuy} />)}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">What Our <span className="gradient-text">Members Say</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t._id} className="card">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={t.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} alt={t.name} className="w-11 h-11 rounded-full bg-dark-400" />
                    <div>
                      <p className="text-white font-medium text-sm">{t.name}</p>
                      <p className="text-slate-500 text-xs">{t.profession}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(5)].map((_, i) => <span key={i} className={i < t.rating ? 'text-gold-400' : 'text-slate-600'} style={{fontSize:'12px'}}>★</span>)}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic">"{t.message}"</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/testimonials" className="btn-secondary">Read All Reviews</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-brand-900/30 via-dark-900 to-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 chart-bg opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Start Your Trading Education <span className="gradient-text">Today</span></h2>
          <p className="text-slate-400 mt-4 text-lg">Join thousands of learners improving their market understanding and trading discipline.</p>
          <p className="text-amber-400/70 text-xs mt-3">⚠️ All content is for educational purposes only. Trading involves substantial risk.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/optionedgetelugu" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center justify-center gap-2">✈ Join Free Channel</a>
            <Link to="/pricing" className="btn-primary flex items-center justify-center gap-2">💎 View Premium Plans</Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
