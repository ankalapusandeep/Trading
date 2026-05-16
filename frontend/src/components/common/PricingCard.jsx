import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PricingCard({ plan, onBuy }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) { navigate('/register'); return; }
    onBuy(plan);
  };

  return (
    <div className={`relative rounded-2xl p-[1px] ${plan.isPopular ? 'bg-gradient-to-b from-brand-500 to-gold-500' : 'bg-white/10'} hover:scale-105 transition-transform duration-300`}>
      {plan.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-gold-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
          MOST POPULAR
        </div>
      )}
      <div className={`rounded-2xl p-7 h-full ${plan.isPopular ? 'bg-dark-600' : 'bg-dark-500'}`}>
        <h3 className="font-display text-2xl font-bold text-white">{plan.name}</h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-slate-400 text-sm">₹</span>
          <span className="font-display text-5xl font-bold gradient-text">{plan.price.toLocaleString('en-IN')}</span>
        </div>
        <p className="text-slate-400 text-sm mt-1">{plan.durationLabel} access</p>
        <div className="mt-6 space-y-3">
          {plan.features?.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-brand-500/20 flex items-center justify-center mt-0.5 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              </div>
              <span className="text-slate-300 text-sm">{f}</span>
            </div>
          ))}
        </div>
        <button onClick={handleClick} className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${plan.isPopular ? 'btn-primary' : 'btn-secondary'}`}>
          {user ? 'Subscribe Now' : 'Get Started'}
        </button>
      </div>
    </div>
  );
}
