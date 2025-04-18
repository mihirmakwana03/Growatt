import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Cursor from './components/cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Career from './pages/Career';
import ServiceDetail from './pages/ServiceDetail';
import WhatsApp from "./components/WhatsApp";
import Login from './components/Admin/login';
import ResetPassword from './components/Admin/ResetPassword';
import Admin from './Admin';
import TermsAndConditions from './components/TermsConditions';
import AdminCarrer from './components/Admin/adcareer';
import PricingComponent from './components/pricing';
import Chatbot from './components/Chatbot';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* {!isAdminRoute && <Cursor />} */}
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <WhatsApp />}
      {!isAdminRoute && <Chatbot />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:service" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/admin/carrer" element={<AdminCarrer />} />
          <Route path="/termsconditions" element={<TermsAndConditions />} />
          <Route path="/pricingcomponent" element={<PricingComponent />} />
        </Routes>
      </main>
      {/* {!isAdminRoute && !isLoginRoute && !isResetPasswordRoute && <Footer />} */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
