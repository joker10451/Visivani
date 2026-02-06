import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { ShopProvider } from '@/contexts/ShopContext';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Pages
import HomePage from '@/pages/HomePage';
import ProductPage from '@/pages/ProductPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrderSuccessPage from '@/pages/OrderSuccessPage';
import AboutPage from '@/pages/AboutPage';
import FAQPage from '@/pages/FAQPage';

function App() {
  return (
    <HelmetProvider>
      <Router basename="/Visivani">
        <ShopProvider>
          <ScrollToTop />
          <div className="min-h-screen bg-amarin-cream">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
            <Footer />
          </div>
          <Toaster 
            position="top-right" 
            richColors 
            closeButton
            toastOptions={{
              style: {
                background: '#FFF8DC',
                border: '1px solid #FFDAB9',
                color: '#5D4037',
              },
            }}
          />
        </ShopProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
