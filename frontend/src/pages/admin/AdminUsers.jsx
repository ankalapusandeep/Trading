import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    adminAPI.getAllUsers().then(r => setUsers(r.data.users)).catch(() => toast.error('Failed to load users.')).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const togglePremium = async (user) => {
    try {
      await adminAPI.updateUser(user._id, {
        isPremium: !user.isPremium,
        premiumExpiresAt: !user.isPremium ? new Date(Date.now() + 30*24*60*60*1000) : null
      });
      toast.success('User updated.');
      load();
    } catch { toast.error('Update failed.'); }
  };

  const deleteUser = async (id) => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    try {
      await adminAPI.deleteUser(id);
      toast.success('User deleted.');
      load();
    } catch { toast.error('Delete failed.'); }
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-dark-900 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Users</h1>
            <p className="text-slate-400 text-sm mt-0.5">{users.length} total users</p>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="input-field w-64 text-sm" />
        </div>

        {loading ? <LoadingSpinner size="lg" className="py-20" /> : (
          <div className="card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-600 text-slate-400 text-xs">
                    <th className="text-left px-4 py-3">Name</th>
                    <th className="text-left px-4 py-3">Email</th>
                    <th className="text-left px-4 py-3">Role</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Expires</th>
                    <th className="text-left px-4 py-3">Joined</th>
                    <th className="text-left px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map(u => (
                    <tr key={u._id} className="hover:bg-dark-600/50 transition-colors">
                      <td className="px-4 py-3 text-white font-medium">{u.name}</td>
                      <td className="px-4 py-3 text-slate-400">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-dark-600 text-slate-400'}`}>{u.role}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge ${u.isPremium ? 'bg-brand-500/10 text-brand-400' : 'bg-dark-600 text-slate-500'}`}>
                          {u.isPremium ? '💎 Premium' : 'Free'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {u.premiumExpiresAt ? new Date(u.premiumExpiresAt).toLocaleDateString('en-IN') : '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => togglePremium(u)} className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${u.isPremium ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'}`}>
                            {u.isPremium ? 'Revoke' : 'Grant'} Premium
                          </button>
                          {u.role !== 'admin' && (
                            <button onClick={() => deleteUser(u._id)} className="text-xs px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">Delete</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && <div className="text-center py-10 text-slate-500 text-sm">No users found.</div>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
