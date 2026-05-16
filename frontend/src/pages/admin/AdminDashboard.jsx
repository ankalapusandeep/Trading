import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ label, value, sub, icon, color }) => (
  <div className="card flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${color}`}>{icon}</div>
    <div>
      <p className="text-slate-400 text-xs">{label}</p>
      <p className="text-white font-display font-bold text-2xl">{value}</p>
      {sub && <p className="text-slate-500 text-xs mt-0.5">{sub}</p>}
    </div>
  </div>
);

const mockChartData = [
  { name: 'Jan', revenue: 4200 }, { name: 'Feb', revenue: 6800 }, { name: 'Mar', revenue: 5900 },
  { name: 'Apr', revenue: 9200 }, { name: 'May', revenue: 8100 }, { name: 'Jun', revenue: 11400 },
  { name: 'Jul', revenue: 10200 }, { name: 'Aug', revenue: 13500 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getDashboard().then(r => {
      setStats(r.data.stats);
      setPayments(r.data.recentPayments);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-dark-900 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">TradeMentor Pro — Overview</p>
        </div>

        {loading ? <LoadingSpinner size="lg" className="py-20" /> : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Users" value={stats?.totalUsers || 0} icon="👥" color="bg-blue-500/10" />
              <StatCard label="Premium Members" value={stats?.premiumUsers || 0} icon="💎" color="bg-brand-500/10" />
              <StatCard label="Total Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString('en-IN')}`} icon="💰" color="bg-green-500/10" />
              <StatCard label="Market Updates" value={stats?.totalUpdates || 0} sub={`${stats?.unreadMessages || 0} unread msgs`} icon="📊" color="bg-purple-500/10" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <div className="xl:col-span-2 card">
                <h3 className="text-white font-semibold mb-4">Revenue Overview (₹)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={mockChartData}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '8px', color: '#e2e8f0' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} fill="url(#rev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { to: '/admin/market-updates', label: 'Add Market Update', icon: '📊' },
                    { to: '/admin/plans', label: 'Manage Plans', icon: '💎' },
                    { to: '/admin/testimonials', label: 'Add Testimonial', icon: '⭐' },
                    { to: '/admin/messages', label: `View Messages ${stats?.unreadMessages ? `(${stats.unreadMessages})` : ''}`, icon: '✉' },
                    { to: '/admin/users', label: 'Manage Users', icon: '👥' },
                    { to: '/admin/payments', label: 'View Payments', icon: '💳' },
                  ].map(a => (
                    <Link key={a.to} to={a.to} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-dark-600 hover:bg-dark-400 transition-colors text-sm text-slate-300 hover:text-white">
                      <span>{a.icon}</span><span>{a.label}</span><span className="ml-auto text-slate-600">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            {payments.length > 0 && (
              <div className="card mt-6">
                <h3 className="text-white font-semibold mb-4">Recent Payments</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate-500 text-xs border-b border-white/5">
                        <th className="text-left pb-3">User</th>
                        <th className="text-left pb-3">Plan</th>
                        <th className="text-left pb-3">Amount</th>
                        <th className="text-left pb-3">Status</th>
                        <th className="text-left pb-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map(p => (
                        <tr key={p._id} className="border-b border-white/5">
                          <td className="py-3 text-white">{p.userId?.name}<br/><span className="text-slate-500 text-xs">{p.userId?.email}</span></td>
                          <td className="py-3 text-slate-300">{p.planId?.name}</td>
                          <td className="py-3 text-slate-300">₹{p.amount?.toLocaleString('en-IN')}</td>
                          <td className="py-3"><span className="badge bg-green-500/10 text-green-400">{p.status}</span></td>
                          <td className="py-3 text-slate-400">{new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
