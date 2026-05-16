import React from 'react';
import { Link } from 'react-router-dom';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

const milestones = [
  { year: '2016', title: 'Started Trading', desc: 'Began full-time trading in Indian equity markets after years of learning.' },
  { year: '2018', title: 'YouTube Channel', desc: 'Launched YouTube channel to share free educational content with fellow traders.' },
  { year: '2020', title: 'Free Telegram', desc: 'Started free Telegram channel to share real-time market updates.' },
  { year: '2022', title: 'Premium Community', desc: 'Launched premium channel with detailed trade setups and mentorship.' },
  { year: '2024', title: '12K+ Members', desc: 'Grown to a thriving community of 12,000+ students and traders.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <DisclaimerBanner />
      <section className="py-24 mesh-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="badge bg-brand-500/10 text-brand-400 mb-4">About the Mentor</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                8+ Years of Market <span className="gradient-text">Experience</span>
              </h1>
              <p className="text-slate-400 mt-6 text-lg leading-relaxed">
                A full-time equity and derivatives trader with over 8 years of experience in Indian stock markets. Specializes in technical analysis, price action trading, and options strategies.
              </p>
              <p className="text-slate-400 mt-4 leading-relaxed">
                The mission is simple: make quality trading education accessible to every aspiring trader in India. Through YouTube live streams, free Telegram updates, and a premium community — we focus on building trading discipline, risk management, and consistent market understanding.
              </p>
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-amber-400 text-sm font-medium">⚠️ Important Note</p>
                <p className="text-amber-300/70 text-xs mt-1">All calls and analysis are strictly educational. Past educational examples are not indicative of future results. Trading involves substantial risk of loss.</p>
              </div>
              <div className="mt-8 flex gap-4">
                <a href="https://youtube.com/@tradementorpro" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm flex items-center gap-2">▶ YouTube Channel</a>
                <Link to="/contact" className="btn-ghost text-sm">Contact Me →</Link>
              </div>
            </div>
            <div className="relative">
              <div className="w-full max-w-sm mx-auto">
                <div className="relative rounded-3xl overflow-hidden glow-orange">
                  <div className="aspect-square bg-gradient-to-br from-brand-900/50 to-dark-600 rounded-3xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-500 to-gold-500 mx-auto flex items-center justify-center text-5xl font-display font-bold text-white">TM</div>
                      <h3 className="text-white font-display font-bold text-xl mt-4">TradeMentor Pro</h3>
                      <p className="text-slate-400 text-sm mt-1">Full-Time Trader & Educator</p>
                      <div className="flex justify-center gap-4 mt-4">
                        <div className="text-center">
                          <div className="gradient-text font-bold text-lg font-display">45K+</div>
                          <div className="text-slate-500 text-xs">YouTube Subs</div>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div className="text-center">
                          <div className="gradient-text font-bold text-lg font-display">12K+</div>
                          <div className="text-slate-500 text-xs">Members</div>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div className="text-center">
                          <div className="gradient-text font-bold text-lg font-display">8+</div>
                          <div className="text-slate-500 text-xs">Years</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title text-center mb-12">The <span className="gradient-text">Journey</span></h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-brand-500/20" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="relative flex gap-6">
                  <div className="w-16 h-16 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center shrink-0 z-10">
                    <span className="text-brand-400 font-mono font-bold text-xs">{m.year}</span>
                  </div>
                  <div className="card flex-1 mt-2">
                    <h3 className="text-white font-semibold">{m.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
