import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
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
import ResetPassword from './components/Admin/ResetPassword';
import Admin from './Admin';
import TermsAndConditions from './components/TermsConditions';
import AdminCarrer from './components/Admin/AdCareer';
import PricingComponent from './components/pricing';
import PrivateRoute from './PrivateRoute';
import { logout } from './redux/admin/adminSlice.js';

// SessionManager Component
const SessionManager = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      const sessionTimeout = setTimeout(() => {
        dispatch(logout()); // Dispatch logout action when session expires
        alert('Your session has expired. You have been logged out.');
      }, 3600000); // Set session timeout (e.g., 1 hour = 3600000ms)

      return () => clearTimeout(sessionTimeout); // Clear timeout on component unmount
    }
  }, [currentUser, dispatch]);

  return null; // This component doesn't render anything
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname === '/login';
  const isResetPasswordRoute = location.pathname === '/reset';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <SessionManager /> {/* Add SessionManager here */}
      {!isAdminRoute && !isLoginRoute && !isResetPasswordRoute && <Cursor />}
      {!isAdminRoute && !isLoginRoute && !isResetPasswordRoute && <Navbar />}
      {!isAdminRoute && !isLoginRoute && !isResetPasswordRoute && <WhatsApp />}
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
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/admin/carrer" element={<AdminCarrer />} />
          <Route path="/termsconditions" element={<TermsAndConditions />} />
          <Route path="/pricingcomponent" element={<PricingComponent />} />
        </Routes>
      </main>
      {!isAdminRoute && !isLoginRoute && !isResetPasswordRoute && <Footer />}
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
