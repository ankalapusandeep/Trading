import React from 'react';
import { Link } from 'react-router-dom';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

const premiumFeatures = [
  { icon: '📊', title: 'Daily F&O Setups', desc: 'Detailed options and futures trade setups with proper risk management.' },
  { icon: '🎯', title: 'High-Accuracy Analysis', desc: 'In-depth technical analysis with multiple timeframe confirmation.' },
  { icon: '📹', title: 'Exclusive Webinars', desc: 'Weekly live webinars on advanced trading strategies and market outlook.' },
  { icon: '📄', title: 'PDF Study Material', desc: 'Exclusive trading guides, chart pattern PDFs, and strategy documents.' },
  { icon: '💬', title: 'Priority Support', desc: 'Get your trading questions answered directly in the premium group.' },
  { icon: '🧑‍🏫', title: '1-on-1 Mentorship', desc: 'Elite plan includes personal portfolio review and mentorship sessions.' },
];

export default function PremiumChannel() {
  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <DisclaimerBanner />
      <section className="py-24 mesh-bg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="badge bg-gold-500/20 text-gold-400 mb-4">💎 Premium Community</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Join the <span className="gradient-text">Premium Telegram</span> Channel</h1>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">Exclusive trade setups, webinars, PDF materials, and mentorship for serious learners.</p>
          <p className="text-amber-400/70 text-xs mt-3">⚠️ Educational content only. Past examples are not indicative of future performance.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing" className="btn-primary flex items-center justify-center gap-2 text-base py-3.5 px-8">💎 View Plans & Join</Link>
            <a href="https://t.me/tradementorpro_free" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center justify-center gap-2 text-base py-3.5 px-8">✈ Try Free Channel First</a>
          </div>
        </div>
      </section>

      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title text-center mb-12">What You Get with <span className="gradient-text">Premium</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {premiumFeatures.map((f, i) => (
              <div key={i} className="card group hover:border-gold-500/20 hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold group-hover:text-gold-400 transition-colors">{f.title}</h3>
                <p className="text-slate-400 text-sm mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="card border-brand-500/20 bg-gradient-to-br from-brand-900/20 to-dark-500">
            <h3 className="font-display text-2xl font-bold text-white">Compare: Free vs Premium</h3>
            <div className="mt-6 text-left space-y-3">
              {[
                ['Market Updates', true, true],
                ['Daily Trade Setups', 'Limited', true],
                ['F&O Strategy Calls', false, true],
                ['Webinars & Videos', false, true],
                ['PDF Study Material', false, true],
                ['Priority Q&A Support', false, true],
                ['1-on-1 Mentorship', false, 'Elite Only'],
              ].map(([feat, free, premium], i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-slate-300 text-sm">{feat}</span>
                  <div className="flex gap-12">
                    <span className={`text-xs font-medium ${free === true ? 'text-green-400' : free ? 'text-yellow-400' : 'text-slate-600'}`}>{free === true ? '✓' : free || '✗'}</span>
                    <span className={`text-xs font-medium ${premium === true ? 'text-brand-400' : 'text-gold-400'}`}>{premium === true ? '✓' : premium}</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-end gap-12 pt-2">
                <span className="text-slate-500 text-xs">Free</span>
                <span className="text-brand-400 text-xs font-medium">Premium</span>
              </div>
            </div>
          </div>
          <Link to="/pricing" className="mt-8 btn-primary inline-flex items-center gap-2">Get Premium Access →</Link>
        </div>
      </section>
    </div>
  );
}
