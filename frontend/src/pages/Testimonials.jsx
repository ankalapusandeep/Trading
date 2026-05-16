import React, { useEffect, useState } from 'react';
import { testimonialAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialAPI.getAll().then(r => setTestimonials(r.data.testimonials)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <section className="py-16 mesh-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="section-title">Member <span className="gradient-text">Testimonials</span></h1>
          <p className="section-subtitle">Real feedback from our learning community. Results vary — trading involves risk.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        {loading ? <LoadingSpinner size="lg" className="py-20" /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t._id} className="card hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} alt={t.name} className="w-12 h-12 rounded-full bg-dark-400" />
                  <div>
                    <p className="text-white font-semibold">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.profession}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => <span key={i} className={i < t.rating ? 'text-gold-400' : 'text-slate-700'} style={{fontSize:'13px'}}>★</span>)}
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">"{t.message}"</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
