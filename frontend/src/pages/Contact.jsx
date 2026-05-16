import React, { useState } from 'react';
import { contactAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.send(form);
      toast.success('Message sent! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <section className="py-16 mesh-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="section-title">Get in <span className="gradient-text">Touch</span></h1>
          <p className="section-subtitle">Have a question? We are happy to help.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="text-3xl mb-3">✈</div>
              <h3 className="text-white font-semibold">Telegram</h3>
              <p className="text-slate-400 text-sm mt-1">Join our free channel for quick updates</p>
              <a href="https://t.me/tradementorpro_free" target="_blank" rel="noopener noreferrer" className="text-brand-400 text-sm mt-2 inline-block hover:text-brand-300">@tradementorpro_free</a>
            </div>
            <div className="card">
              <div className="text-3xl mb-3">▶</div>
              <h3 className="text-white font-semibold">YouTube</h3>
              <p className="text-slate-400 text-sm mt-1">Subscribe for free live sessions</p>
              <a href="https://youtube.com/@tradementorpro" target="_blank" rel="noopener noreferrer" className="text-brand-400 text-sm mt-2 inline-block hover:text-brand-300">@tradementorpro</a>
            </div>
            <div className="card">
              <div className="text-3xl mb-3">✉</div>
              <h3 className="text-white font-semibold">Email</h3>
              <p className="text-slate-400 text-sm mt-1">For support and partnerships</p>
              <a href="mailto:support@tradementor.pro" className="text-brand-400 text-sm mt-2 inline-block hover:text-brand-300">support@tradementor.pro</a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="card">
              <h3 className="text-white font-semibold text-lg mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-sm mb-1 block">Your Name</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Rahul Sharma" className="input-field" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-1 block">Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="rahul@email.com" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Subject</label>
                  <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Premium subscription query" className="input-field" />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Message</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required placeholder="Your message here..." rows={5} className="input-field resize-none" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
