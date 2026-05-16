import React, { useEffect, useState } from 'react';
import { marketAPI } from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const EMPTY = { title: '', description: '', category: 'General', tags: '', image: '' };
const CATS = ['Equity', 'Commodity', 'Forex', 'Crypto', 'Index', 'General'];

export default function AdminMarketUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    marketAPI.getAll({ limit: 50 }).then(r => setUpdates(r.data.updates)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (u) => { setEditing(u); setForm({ ...u, tags: u.tags?.join(', ') || '' }); setModal(true); };

  const save = async () => {
    if (!form.title || !form.description) { toast.error('Title and description required.'); return; }
    setSaving(true);
    try {
      const data = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      editing ? await marketAPI.update(editing._id, data) : await marketAPI.create(data);
      toast.success(editing ? 'Updated!' : 'Created!');
      setModal(false); load();
    } catch { toast.error('Save failed.'); } finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!confirm('Delete this update?')) return;
    try { await marketAPI.delete(id); toast.success('Deleted.'); load(); } catch { toast.error('Failed.'); }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-dark-900 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Market Updates</h1>
            <p className="text-slate-400 text-sm mt-0.5">{updates.length} updates</p>
          </div>
          <button onClick={openAdd} className="btn-primary text-sm">+ New Update</button>
        </div>

        {loading ? <LoadingSpinner size="lg" className="py-20" /> : (
          <div className="space-y-3">
            {updates.map(u => (
              <div key={u._id} className="card flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge bg-brand-500/10 text-brand-400 text-xs">{u.category}</span>
                    <span className="text-slate-500 text-xs">{new Date(u.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                  <h3 className="text-white font-medium">{u.title}</h3>
                  <p className="text-slate-400 text-sm mt-1 line-clamp-2">{u.description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(u)} className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">Edit</button>
                  <button onClick={() => del(u._id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">Delete</button>
                </div>
              </div>
            ))}
            {updates.length === 0 && <div className="text-center py-20 text-slate-500">No updates yet. Create one!</div>}
          </div>
        )}

        {/* Modal */}
        {modal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-dark-600 rounded-2xl border border-white/10 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-white font-semibold text-lg mb-5">{editing ? 'Edit Update' : 'New Market Update'}</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Title *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" placeholder="Nifty Analysis for Today" />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field">
                    {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Description *</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={5} className="input-field resize-none" placeholder="Market analysis content..." />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Tags (comma-separated)</label>
                  <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="input-field" placeholder="Nifty, Weekly, Breakout" />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Image URL (optional)</label>
                  <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="input-field" placeholder="https://..." />
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
