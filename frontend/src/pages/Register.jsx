import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match.'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, form.phone);
      toast.success('Account created! Welcome to TradeMentor Pro.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-16 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center font-display font-bold text-white">T</div>
            <span className="font-display font-bold text-white text-xl">TradeMentor <span className="gradient-text">Pro</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white font-display">Create Your Account</h1>
          <p className="text-slate-400 mt-1 text-sm">Join our trading education community</p>
        </div>
        <div className="card border-brand-500/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm mb-1.5 block">Full Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Rahul Sharma" className="input-field" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1.5 block">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="rahul@example.com" className="input-field" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1.5 block">Phone (optional)</label>
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 98765 43210" className="input-field" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1.5 block">Password</label>
              <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required placeholder="Min. 6 characters" className="input-field" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1.5 block">Confirm Password</label>
              <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} required placeholder="Re-enter password" className="input-field" />
            </div>
            <p className="text-slate-500 text-xs">By registering, you agree that all content is for educational purposes. Trading involves risk.</p>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-slate-400 text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
