import React, { useEffect, useState } from 'react';
import { testimonialAPI } from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const EMPTY = { name: '', profession: '', message: '', rating: 5, image: '', isActive: true };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    testimonialAPI.getAllAdmin().then(r => setItems(r.data.testimonials)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (t) => { setEditing(t); setForm({ ...t }); setModal(true); };

  const save = async () => {
    if (!form.name || !form.message) { toast.error('Name and message required.'); return; }
    setSaving(true);
    try {
      editing ? await testimonialAPI.update(editing._id, form) : await testimonialAPI.create(form);
      toast.success(editing ? 'Updated!' : 'Created!');
      setModal(false); load();
    } catch { toast.error('Save failed.'); } finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!confirm('Delete?')) return;
    try { await testimonialAPI.delete(id); toast.success('Deleted.'); load(); } catch { toast.error('Failed.'); }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-dark-900 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Testimonials</h1>
            <p className="text-slate-400 text-sm mt-0.5">{items.length} testimonials</p>
          </div>
          <button onClick={openAdd} className="btn-primary text-sm">+ Add Testimonial</button>
        </div>

        {loading ? <LoadingSpinner size="lg" className="py-20" /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(t => (
              <div key={t._id} className={`card ${!t.isActive ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} alt={t.name} className="w-10 h-10 rounded-full bg-dark-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{t.name}</p>
                    <p className="text-slate-500 text-xs truncate">{t.profession}</p>
                  </div>
                  <span className={`badge text-xs ${t.isActive ? 'bg-green-500/10 text-green-400' : 'bg-dark-600 text-slate-500'}`}>{t.isActive ? 'Active' : 'Hidden'}</span>
                </div>
                <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_,i)=><span key={i} className={i<t.rating?'text-gold-400':'text-slate-700'} style={{fontSize:'12px'}}>★</span>)}</div>
                <p className="text-slate-400 text-xs line-clamp-3 italic">"{t.message}"</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(t)} className="flex-1 text-xs py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">Edit</button>
                  <button onClick={() => del(t._id)} className="flex-1 text-xs py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {modal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-dark-600 rounded-2xl border border-white/10 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-white font-semibold text-lg mb-5">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <div className="space-y-4">
                {[['name','Name','Rahul Sharma'],['profession','Profession / City','Trader, Mumbai'],['image','Avatar URL (optional)','https://...']].map(([key,lbl,ph])=>(
                  <div key={key}>
                    <label className="text-slate-400 text-sm mb-1 block">{lbl}</label>
                    <input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className="input-field" placeholder={ph} />
                  </div>
                ))}
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Rating</label>
                  <select value={form.rating} onChange={e=>setForm({...form,rating:Number(e.target.value)})} className="input-field">
                    {[5,4,3,2,1].map(r=><option key={r} value={r}>{'★'.repeat(r)} ({r}/5)</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Message</label>
                  <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={4} className="input-field resize-none" placeholder="Member's review..." />
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={e=>setForm({...form,isActive:e.target.checked})} className="w-4 h-4 accent-brand-500" />
                  Show on website
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={()=>setModal(false)} className="btn-ghost flex-1">Cancel</button>
                <button onClick={save} disabled={saving} className="btn-primary flex-1">{saving?'Saving...':'Save'}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
