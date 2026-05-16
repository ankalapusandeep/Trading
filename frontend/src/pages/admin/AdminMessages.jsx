import React, { useEffect, useState } from 'react';
import { contactAPI } from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    contactAPI.getAll().then(r => setMessages(r.data.messages)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    try { await contactAPI.markRead(id); load(); } catch {}
  };

  const del = async (id) => {
    if (!confirm('Delete this message?')) return;
    try { await contactAPI.delete(id); toast.success('Deleted.'); setSelected(null); load(); } catch { toast.error('Failed.'); }
  };

  const openMsg = (msg) => {
    setSelected(msg);
    if (!msg.isRead) markRead(msg._id);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-dark-900 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-white">Contact Messages</h1>
          <p className="text-slate-400 text-sm mt-0.5">{messages.filter(m=>!m.isRead).length} unread</p>
        </div>

        {loading ? <LoadingSpinner size="lg" className="py-20" /> : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* List */}
            <div className="space-y-2">
              {messages.length === 0 && <div className="text-center py-20 text-slate-500">No messages yet.</div>}
              {messages.map(m => (
                <div key={m._id} onClick={() => openMsg(m)}
                  className={`card cursor-pointer hover:border-brand-500/20 transition-all ${selected?._id === m._id ? 'border-brand-500/30' : ''} ${!m.isRead ? 'border-l-2 border-l-brand-500' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${!m.isRead ? 'text-white' : 'text-slate-300'}`}>{m.name}</p>
                      <p className="text-slate-500 text-xs truncate">{m.email}</p>
                      {m.subject && <p className="text-slate-400 text-xs mt-0.5 truncate">{m.subject}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-slate-500 text-xs">{new Date(m.createdAt).toLocaleDateString('en-IN')}</p>
                      {!m.isRead && <span className="badge bg-brand-500/10 text-brand-400 text-xs mt-1">New</span>}
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">{m.message}</p>
                </div>
              ))}
            </div>

            {/* Detail */}
            {selected ? (
              <div className="card h-fit sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold">{selected.name}</h3>
                    <a href={`mailto:${selected.email}`} className="text-brand-400 text-sm hover:text-brand-300">{selected.email}</a>
                  </div>
                  <button onClick={() => del(selected._id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">Delete</button>
                </div>
                {selected.subject && <p className="text-slate-300 font-medium text-sm mb-2">Re: {selected.subject}</p>}
                <div className="bg-dark-700 rounded-lg p-4">
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
                <p className="text-slate-500 text-xs mt-3">{new Date(selected.createdAt).toLocaleString('en-IN')}</p>
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your message'}`} className="btn-primary w-full text-sm mt-4 text-center block">Reply via Email</a>
              </div>
            ) : (
              <div className="card flex items-center justify-center h-48 text-slate-500 text-sm">Select a message to view</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
