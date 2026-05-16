import React, { useEffect, useState } from 'react';
import { pricingAPI, paymentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PricingCard from '../components/common/PricingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DisclaimerBanner from '../components/common/DisclaimerBanner';
import toast from 'react-hot-toast';

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    pricingAPI.getAll().then(r => setPlans(r.data.plans)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleBuy = async (plan) => {
    if (!user) { window.location.href = '/register'; return; }
    try {
      toast.loading('Creating order...', { id: 'order' });
      const res = await paymentAPI.createOrder({ planId: plan._id });
      const { order, payment: paymentId, key } = res.data;
      toast.dismiss('order');

      const options = {
        key,
        amount: order.amount,
        currency: 'INR',
        name: 'TradeMentor Pro',
        description: `${plan.name} — ${plan.durationLabel}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            toast.loading('Verifying payment...', { id: 'verify' });
            await paymentAPI.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentId,
            });
            await refreshUser();
            toast.dismiss('verify');
            toast.success('🎉 Premium access activated!');
          } catch (err) {
            toast.dismiss('verify');
            toast.error('Payment verification failed. Contact support.');
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: '#f97316' },
        modal: { ondismiss: () => toast('Payment cancelled.', { icon: 'ℹ️' }) },
      };

      if (window.Razorpay) {
        new window.Razorpay(options).open();
      } else {
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => new window.Razorpay(options).open();
        document.head.appendChild(script);
      }
    } catch (err) {
      toast.dismiss('order');
      toast.error(err.response?.data?.message || 'Failed to create order.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <DisclaimerBanner />
      <section className="py-16 mesh-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="section-title">Choose Your <span className="gradient-text">Learning Plan</span></h1>
          <p className="section-subtitle">Invest in your trading education. All plans include access to our premium Telegram community.</p>
          <p className="text-amber-400/70 text-xs mt-3">⚠️ We do not guarantee trading profits. These are educational memberships.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        {loading ? <LoadingSpinner size="lg" className="py-20" /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map(p => <PricingCard key={p._id} plan={p} onBuy={handleBuy} />)}
          </div>
        )}

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="section-title text-center mb-8">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="space-y-4">
            {[
              ['What do I get after payment?', 'After successful payment, you receive an invite link to the premium Telegram channel. Access is activated immediately in your account.'],
              ['Are these trading signals or educational content?', 'All content is purely educational. We share analysis to help you learn — not financial advice or guaranteed trading signals.'],
              ['Is there a refund policy?', 'Due to the digital nature of content, refunds are not available after accessing the premium channel. Please try our free channel first.'],
              ['What payment methods are accepted?', 'We accept all payment methods via Razorpay — UPI, debit/credit cards, net banking, and wallets.'],
              ['Can I upgrade my plan?', 'Yes, you can upgrade at any time. Contact us and we will apply a pro-rated adjustment.'],
            ].map(([q, a], i) => (
              <div key={i} className="card">
                <h4 className="text-white font-semibold text-sm">{q}</h4>
                <p className="text-slate-400 text-sm mt-2">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
