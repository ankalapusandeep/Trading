import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { paymentAPI } from '../services/api';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    paymentAPI.getMyPayments().then(r => setPayments(r.data.payments)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const premiumActive = user?.isPremium && (!user?.premiumExpiresAt || new Date(user.premiumExpiresAt) > new Date());
  const daysLeft = user?.premiumExpiresAt ? Math.max(0, Math.ceil((new Date(user.premiumExpiresAt) - new Date()) / (1000 * 60 * 60 * 24))) : 0;

  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white">Welcome, <span className="gradient-text">{user?.name?.split(' ')[0]}</span></h1>
          <p className="text-slate-400 mt-1">Manage your membership and track your learning journey.</p>
        </div>

        {/* Status card */}
        <div className={`rounded-2xl p-6 mb-6 border ${premiumActive ? 'bg-gradient-to-br from-brand-900/30 to-gold-900/20 border-brand-500/30' : 'bg-dark-500 border-white/5'}`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${premiumActive ? 'bg-brand-500/20' : 'bg-dark-600'}`}>
                {premiumActive ? '💎' : '👤'}
              </div>
              <div>
                <p className="text-white font-semibold text-lg">{user?.name}</p>
                <p className="text-slate-400 text-sm">{user?.email}</p>
                <span className={`badge mt-1 ${premiumActive ? 'bg-brand-500/20 text-brand-400' : 'bg-dark-600 text-slate-400'}`}>
                  {premiumActive ? '💎 Premium Active' : '👤 Free Member'}
                </span>
              </div>
            </div>
            {premiumActive ? (
              <div className="text-right">
                <p className="text-slate-400 text-xs">Expires</p>
                <p className="text-white font-semibold">{new Date(user.premiumExpiresAt).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</p>
                <p className="text-brand-400 text-sm">{daysLeft} days remaining</p>
              </div>
            ) : (
              <Link to="/pricing" className="btn-primary text-sm">Upgrade to Premium →</Link>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <a href="https://t.me/optionedgetelugu" target="_blank" rel="noopener noreferrer" className="card hover:border-blue-500/20 flex items-center gap-3 group">
            <span className="text-2xl">✈</span>
            <div>
              <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">Free Telegram</p>
              <p className="text-slate-500 text-xs">Join free channel</p>
            </div>
          </a>
          <a href="https://youtube.com/@optionedge9" target="_blank" rel="noopener noreferrer" className="card hover:border-red-500/20 flex items-center gap-3 group">
            <span className="text-2xl">▶</span>
            <div>
              <p className="text-white text-sm font-medium group-hover:text-red-400 transition-colors">YouTube Channel</p>
              <p className="text-slate-500 text-xs">Watch live sessions</p>
            </div>
          </a>
          {premiumActive ? (
            <a href="https://t.me/tradementorpro_premium" target="_blank" rel="noopener noreferrer" className="card hover:border-brand-500/20 flex items-center gap-3 group">
              <span className="text-2xl">💎</span>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-brand-400 transition-colors">Premium Channel</p>
                <p className="text-slate-500 text-xs">Access your channel</p>
              </div>
            </a>
          ) : (
            <Link to="/pricing" className="card hover:border-brand-500/20 flex items-center gap-3 group">
              <span className="text-2xl">💎</span>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-brand-400 transition-colors">Go Premium</p>
                <p className="text-slate-500 text-xs">Unlock full access</p>
              </div>
            </Link>
          )}
        </div>

        {/* Payment History */}
        <div className="card">
          <h2 className="text-white font-semibold mb-4">Payment History</h2>
          {loading ? (
            <div className="py-8 text-center text-slate-500 text-sm">Loading...</div>
          ) : payments.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-slate-500 text-sm">No payments yet.</p>
              <Link to="/pricing" className="btn-primary text-sm mt-4 inline-block">View Plans</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-500 text-xs border-b border-white/5">
                    <th className="text-left pb-3">Plan</th>
                    <th className="text-left pb-3">Amount</th>
                    <th className="text-left pb-3">Status</th>
                    <th className="text-left pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {payments.map(p => (
                    <tr key={p._id} className="border-b border-white/5">
                      <td className="py-3 text-white">{p.planId?.name} ({p.planId?.durationLabel})</td>
                      <td className="py-3 text-slate-300">₹{p.amount?.toLocaleString('en-IN')}</td>
                      <td className="py-3">
                        <span className={`badge ${p.status === 'completed' ? 'bg-green-500/10 text-green-400' : p.status === 'failed' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">{new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
