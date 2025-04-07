import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        {/* <Cursor /> */}
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:service" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;