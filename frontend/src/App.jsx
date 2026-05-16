import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import MarketUpdates from './pages/MarketUpdates';
import PremiumChannel from './pages/PremiumChannel';
import YouTubeLive from './pages/YouTubeLive';
import Pricing from './pages/Pricing';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminMarketUpdates from './pages/admin/AdminMarketUpdates';
import AdminPlans from './pages/admin/AdminPlans';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminMessages from './pages/admin/AdminMessages';
import AdminPayments from './pages/admin/AdminPayments';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full" /></div>;
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full" /></div>;
  return user?.role === 'admin' ? children : <Navigate to="/" />;
};

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

const AdminLayout = ({ children }) => (
  <main className="min-h-screen bg-dark-900">{children}</main>
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/market-updates" element={<PublicLayout><MarketUpdates /></PublicLayout>} />
      <Route path="/premium" element={<PublicLayout><PremiumChannel /></PublicLayout>} />
      <Route path="/youtube-live" element={<PublicLayout><YouTubeLive /></PublicLayout>} />
      <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
      <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
      <Route path="/dashboard" element={<ProtectedRoute><PublicLayout><UserDashboard /></PublicLayout></ProtectedRoute>} />
      <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />
      <Route path="/admin/market-updates" element={<AdminRoute><AdminLayout><AdminMarketUpdates /></AdminLayout></AdminRoute>} />
      <Route path="/admin/plans" element={<AdminRoute><AdminLayout><AdminPlans /></AdminLayout></AdminRoute>} />
      <Route path="/admin/testimonials" element={<AdminRoute><AdminLayout><AdminTestimonials /></AdminLayout></AdminRoute>} />
      <Route path="/admin/messages" element={<AdminRoute><AdminLayout><AdminMessages /></AdminLayout></AdminRoute>} />
      <Route path="/admin/payments" element={<AdminRoute><AdminLayout><AdminPayments /></AdminLayout></AdminRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(249,115,22,0.2)' },
          success: { iconTheme: { primary: '#f97316', secondary: '#1a1a2e' } },
        }}
      />
      <AppRoutes />
    </AuthProvider>
  );
}
