import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { useSupabase } from './hooks/useSupabase';
import { Navbar } from './components/layout/Navbar';
import { HostNavbar } from './components/layout/HostNavbar';
import { AdminNavbar } from './components/layout/AdminNavbar';
import { Footer } from './components/layout/Footer';
import { Chatbot } from './components/ui/chatbot';
import { CookieConsent } from './components/common/CookieConsent';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Favorites } from './pages/Favorites';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { HostProfile } from './pages/HostProfile';
import { HostDashboard } from './pages/HostDashboard';
import { HostKYC } from './pages/HostKYC';
import { CreateProduct } from './pages/CreateProduct';
import { CompleteProfile } from './pages/CompleteProfile';
import { HostAnalytics } from './pages/HostAnalytics';
import { MyRentals } from './pages/MyRentals';
import { Payment } from './pages/Payment';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { DatabaseSetup } from './pages/DatabaseSetup';
import { PasswordReset } from './pages/PasswordReset';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { NotFound } from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { useAppSelector, useAppDispatch } from './hooks';
import { logout } from './store/slices/authSlice';
import { useOnlineStatus } from './utils/offline';

// Session check and online status component
const SessionChecker = () => {
  const { sessionExpiry } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useOnlineStatus();

  React.useEffect(() => {
    if (sessionExpiry) {
      const expiryDate = new Date(sessionExpiry);
      const now = new Date();

      if (now > expiryDate) {
        dispatch(logout());
      }
    }
  }, [sessionExpiry, dispatch]);

  return null;
};

function App() {
  const { loading: authLoading } = useSupabase();
  const { user } = useAppSelector((state) => state.auth);
  const isHost = user?.role === 'host';
  const isAdmin = user?.email === 'admin@renthub.com';

  if (authLoading) {
    return (
      <ErrorBoundary>
        <HelmetProvider>
          <ThemeProvider>
            <SessionChecker />
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Connecting to RentHub...</p>
                <p className="text-xs text-muted-foreground mt-2">
                  If this takes too long, the database might need to be set up.
                </p>
              </div>
            </div>
          </ThemeProvider>
        </HelmetProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <SessionChecker />
          <Router>
            <div className="min-h-screen bg-background">
              {isAdmin ? <AdminNavbar /> : isHost ? <HostNavbar /> : <Navbar />}

              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/my-rentals" element={<MyRentals />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/password-reset" element={<PasswordReset />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/host/profile" element={<HostProfile />} />
                  <Route path="/host/complete-profile" element={<CompleteProfile />} />
                  <Route path="/host/dashboard" element={<HostDashboard />} />
                  <Route path="/host/analytics" element={<HostAnalytics />} />
                  <Route path="/host/kyc" element={<HostKYC />} />
                  <Route path="/host/create-product" element={<CreateProduct />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/database-setup" element={<DatabaseSetup />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
              <Chatbot />
              <CookieConsent />
              <Toaster />
            </div>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;