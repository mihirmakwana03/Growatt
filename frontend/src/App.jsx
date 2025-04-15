import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Cursor from './components/cursor';
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
<<<<<<< HEAD
import ResetPassword from './components/Admin/ResetPassword';
=======
>>>>>>> a4bac4c (first commit)
import Admin from './Admin';
import TermsAndConditions from './components/TermsConditions';
import AdminCarrer from './components/Admin/AdCareer';
import PricingComponent from './components/pricing';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
<<<<<<< HEAD
  const isLoginRoute = location.pathname === '/login';
  const isResetPasswordRoute = location.pathname === '/reset';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {!isAdminRoute && !isLoginRoute && !isResetPasswordRoute && <Cursor />}
      {!isAdminRoute && !isLoginRoute && !isResetPasswordRoute && <Navbar />}
      {!isAdminRoute && !isLoginRoute && !isResetPasswordRoute && <WhatsApp />}
=======

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {!isAdminRoute && <Cursor />}
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <WhatsApp />}
>>>>>>> a4bac4c (first commit)
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
<<<<<<< HEAD
          <Route path="/reset" element={<ResetPassword />} />
=======
>>>>>>> a4bac4c (first commit)
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/admin/carrer" element={<AdminCarrer />} />
          <Route path="/termsconditions" element={<TermsAndConditions />} />
          <Route path="/pricingcomponent" element={<PricingComponent />} />
        </Routes>
      </main>
<<<<<<< HEAD
      {!isAdminRoute && !isLoginRoute && !isResetPasswordRoute && <Footer />}
=======
      {!isAdminRoute && <Footer />}
>>>>>>> a4bac4c (first commit)
    </div>
  );
}

<<<<<<< HEAD

=======
>>>>>>> a4bac4c (first commit)
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
