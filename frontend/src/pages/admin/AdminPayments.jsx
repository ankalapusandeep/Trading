import React, { useEffect, useState } from 'react';
import { paymentAPI } from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    paymentAPI.getAllPayments().then(r => setPayments(r.data.payments)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? payments : payments.filter(p => p.status === filter);
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-dark-900 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-white">Payments</h1>
          <p className="text-slate-400 text-sm mt-0.5">Total Revenue: <span className="text-green-400 font-semibold">₹{totalRevenue.toLocaleString('en-IN')}</span></p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Completed', count: payments.filter(p=>p.status==='completed').length, color: 'text-green-400' },
            { label: 'Pending', count: payments.filter(p=>p.status==='pending').length, color: 'text-yellow-400' },
            { label: 'Failed', count: payments.filter(p=>p.status==='failed').length, color: 'text-red-400' },
          ].map(s => (
            <div key={s.label} className="card text-center">
              <p className={`font-display text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-slate-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
          {['all','completed','pending','failed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${filter===f?'bg-brand-500 text-white':'bg-dark-500 text-slate-400 border border-white/5 hover:bg-dark-400'}`}>{f}</button>
          ))}
        </div>

        {loading ? <LoadingSpinner size="lg" className="py-20" /> : (
          <div className="card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-600 text-slate-400 text-xs">
                    <th className="text-left px-4 py-3">User</th>
                    <th className="text-left px-4 py-3">Plan</th>
                    <th className="text-left px-4 py-3">Amount</th>
                    <th className="text-left px-4 py-3">Razorpay Order ID</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map(p => (
                    <tr key={p._id} className="hover:bg-dark-600/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-white">{p.userId?.name}</p>
                        <p className="text-slate-500 text-xs">{p.userId?.email}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{p.planId?.name}</td>
                      <td className="px-4 py-3 text-white font-medium">₹{p.amount?.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">{p.razorpayOrderId?.substring(0, 20)}...</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${p.status==='completed'?'bg-green-500/10 text-green-400':p.status==='failed'?'bg-red-500/10 text-red-400':'bg-yellow-500/10 text-yellow-400'}`}>{p.status}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && <div className="text-center py-10 text-slate-500 text-sm">No payments found.</div>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
