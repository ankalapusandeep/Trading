import React, { useEffect, useState } from 'react';
import { pricingAPI } from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const EMPTY = { name: '', price: '', duration: '', durationLabel: '', features: '', isActive: true, isPopular: false };

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    pricingAPI.getAllAdmin().then(r => setPlans(r.data.plans)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (p) => { setEditing(p); setForm({ ...p, features: p.features?.join('\n') || '' }); setModal(true); };

  const save = async () => {
    if (!form.name || !form.price) { toast.error('Name and price required.'); return; }
    setSaving(true);
    try {
      const data = { ...form, price: Number(form.price), duration: Number(form.duration), features: form.features.split('\n').map(f => f.trim()).filter(Boolean) };
      editing ? await pricingAPI.update(editing._id, data) : await pricingAPI.create(data);
      toast.success(editing ? 'Plan updated!' : 'Plan created!');
      setModal(false); load();
    } catch { toast.error('Save failed.'); } finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!confirm('Delete this plan?')) return;
    try { await pricingAPI.delete(id); toast.success('Deleted.'); load(); } catch { toast.error('Failed.'); }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-dark-900 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Pricing Plans</h1>
            <p className="text-slate-400 text-sm mt-0.5">{plans.length} plans</p>
          </div>
          <button onClick={openAdd} className="btn-primary text-sm">+ New Plan</button>
        </div>

        {loading ? <LoadingSpinner size="lg" className="py-20" /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map(p => (
              <div key={p._id} className={`card border ${p.isPopular ? 'border-brand-500/30' : 'border-white/5'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold text-lg">{p.name}</h3>
                  <div className="flex gap-1">
                    {p.isPopular && <span className="badge bg-brand-500/10 text-brand-400">Popular</span>}
                    <span className={`badge ${p.isActive ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'}`}>{p.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
                <p className="font-display text-3xl font-bold gradient-text">₹{p.price.toLocaleString('en-IN')}</p>
                <p className="text-slate-400 text-sm">{p.durationLabel}</p>
                <ul className="mt-3 space-y-1">
                  {p.features?.slice(0, 3).map((f, i) => <li key={i} className="text-slate-400 text-xs flex items-center gap-1.5"><span className="text-brand-500">•</span>{f}</li>)}
                  {p.features?.length > 3 && <li className="text-slate-500 text-xs">+{p.features.length - 3} more</li>}
                </ul>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => openEdit(p)} className="flex-1 text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">Edit</button>
                  <button onClick={() => del(p._id)} className="flex-1 text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">Delete</button>
                </div>
              </div>
            ))}
            {plans.length === 0 && <div className="col-span-3 text-center py-20 text-slate-500">No plans yet.</div>}
          </div>
        )}

        {modal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-dark-600 rounded-2xl border border-white/10 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-white font-semibold text-lg mb-5">{editing ? 'Edit Plan' : 'New Pricing Plan'}</h2>
              <div className="space-y-4">
                {[['name','Plan Name','e.g., Pro'],['price','Price (₹)','2499'],['duration','Duration (days)','90'],['durationLabel','Duration Label','3 Months']].map(([key, label, ph]) => (
                  <div key={key}>
                    <label className="text-slate-400 text-sm mb-1 block">{label}</label>
                    <input value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} className="input-field" placeholder={ph} />
                  </div>
                ))}
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Features (one per line)</label>
                  <textarea value={form.features} onChange={e => setForm({...form, features: e.target.value})} rows={5} className="input-field resize-none" placeholder={"Daily Trade Setups\nOptions Analysis\nWebinars"} />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="w-4 h-4 accent-brand-500" />
                    Active
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" checked={form.isPopular} onChange={e => setForm({...form, isPopular: e.target.checked})} className="w-4 h-4 accent-brand-500" />
                    Mark as Popular
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setModal(false)} className="btn-ghost flex-1">Cancel</button>
                <button onClick={save} disabled={saving} className="btn-primary flex-1">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
