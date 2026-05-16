import React, { useEffect, useState } from 'react';
import { marketAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

const categories = ['All', 'Equity', 'Commodity', 'Forex', 'Crypto', 'Index', 'General'];

export default function MarketUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    const params = { page, limit: 9 };
    if (category !== 'All') params.category = category;
    marketAPI.getAll(params).then(r => {
      setUpdates(r.data.updates);
      setTotal(r.data.total);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [category, page]);

  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <DisclaimerBanner />
      <section className="py-16 mesh-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="section-title">Free <span className="gradient-text">Market Updates</span></h1>
          <p className="section-subtitle">Daily educational market analysis — completely free.</p>
          <p className="text-amber-400/70 text-xs mt-3">⚠️ For educational purposes only. Not investment advice.</p>
        </div>
      </section>
      
      <section className="py-12 max-w-7xl mx-auto px-4">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(c => (
            <button key={c} onClick={() => { setCategory(c); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${category === c ? 'bg-brand-500 text-white' : 'bg-dark-500 text-slate-400 hover:bg-dark-400 hover:text-white border border-white/5'}`}>
              {c}
            </button>
          ))}
        </div>

        {loading ? <LoadingSpinner size="lg" className="py-20" /> : (
          <>
            {updates.length === 0 ? (
              <div className="text-center py-20 text-slate-500">No updates found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {updates.map(u => (
                  <div key={u._id} className="card group hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge bg-brand-500/10 text-brand-400">{u.category}</span>
                      <span className="text-slate-500 text-xs">{new Date(u.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                    </div>
                    <h3 className="text-white font-semibold group-hover:text-brand-400 transition-colors">{u.title}</h3>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">{u.description}</p>
                    {u.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {u.tags.map((t, i) => <span key={i} className="text-xs text-slate-500 bg-dark-600 px-2 py-0.5 rounded">#{t}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {total > 9 && (
              <div className="flex justify-center gap-2 mt-8">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="btn-secondary text-sm disabled:opacity-40">← Prev</button>
                <span className="text-slate-400 text-sm py-2 px-3">Page {page}</span>
                <button onClick={() => setPage(p => p+1)} disabled={updates.length < 9} className="btn-secondary text-sm disabled:opacity-40">Next →</button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
