import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { Scene } from '../components/Scene';
import { motion } from 'framer-motion';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { GoogleReviewsWidget } from '../components/GoogleReviewsWidget';

// Use API_URL from environment variables; fallback to localhost for development.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Home() {
  const sectionRef = useRef(null);
  const [recentWorks, setRecentWorks] = useState([]);

  // Fetch portfolio data on component mount and store the first three items as recent work.
  useEffect(() => {
    axios.get(`${API_URL}/portfolio`)
      .then((response) => {
        // If your portfolio items have a creation date, you could sort them:
        // const sortedItems = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // setRecentWorks(sortedItems.slice(0, 3));

        // Otherwise, simply slice the first three items:
        setRecentWorks(response.data.slice(0, 3));
      })
      .catch((err) => {
        console.error("Error fetching recent works:", err);
      });
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8] }}>
            <Scene />
          </Canvas>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 pt-20 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h2 className="text-6xl font-bold font-poppins leading-tight mb-6 gsap-fade-up">
                Transforming Ideas into
                <span className="text-gradient"> Visual Excellence</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 gsap-fade-up">
                Elevating brands through innovative design solutions since 2020
              </p>
              <button
                className="button-gradient px-8 py-3 rounded-lg font-medium gsap-fade-up"
                onClick={() => (window.location.href = '/contact')}
              >
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 gsap-fade-up text-[#ff6d00]">
            Our Featured Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="/services/logo-design"
              className="p-6 bg-[#1a1a1a] rounded-lg text-center gsap-fade-up transition-transform transform hover:scale-105 hover:bg-[#2a2a2a]"
            >
              <h3 className="text-2xl font-bold mb-4 transition-colors text-[#00ffff]">
                Logo Design
              </h3>
              <p className="text-gray-300">
                Creating unique and impactful logos that define your brand identity.
              </p>
            </a>
            <a
              href="/services/brand-identity-design"
              className="p-6 bg-[#1a1a1a] rounded-lg text-center gsap-fade-up transition-transform transform hover:scale-105 hover:bg-[#2a2a2a]"
            >
              <h3 className="text-2xl font-bold mb-4 transition-colors text-[#00ffff]">
                Brand Identity Design
              </h3>
              <p className="text-gray-300">
                Comprehensive design solutions to establish a cohesive brand image.
              </p>
            </a>
            <a
              href="/services/packaging-design"
              className="p-6 bg-[#1a1a1a] rounded-lg text-center gsap-fade-up transition-transform transform hover:scale-105 hover:bg-[#2a2a2a]"
            >
              <h3 className="text-2xl font-bold mb-4 transition-colors text-[#00ffff]">
                Packaging Design
              </h3>
              <p className="text-gray-300">
                Designing attractive and functional packaging that stands out on shelves.
              </p>
            </a>
            <a
              href="/services/business-card-design"
              className="p-6 bg-[#1a1a1a] rounded-lg text-center gsap-fade-up transition-transform transform hover:scale-105 hover:bg-[#2a2a2a]"
            >
              <h3 className="text-2xl font-bold mb-4 transition-colors text-[#00ffff]">
                Business Card Design
              </h3>
              <p className="text-gray-300">
                Professional and creative business card designs to leave a lasting impression.
              </p>
            </a>
            <a
              href="/services/letterheads"
              className="p-6 bg-[#1a1a1a] rounded-lg text-center gsap-fade-up transition-transform transform hover:scale-105 hover:bg-[#2a2a2a]"
            >
              <h3 className="text-2xl font-bold mb-4 transition-colors text-[#00ffff]">
                Letterheads
              </h3>
              <p className="text-gray-300">
                Custom letterhead designs to enhance your brand's professional image.
              </p>
            </a>
            <a
              href="/services/label-design"
              className="p-6 bg-[#1a1a1a] rounded-lg text-center gsap-fade-up transition-transform transform hover:scale-105 hover:bg-[#2a2a2a]"
            >
              <h3 className="text-2xl font-bold mb-4 transition-colors text-[#00ffff]">
                Label Design
              </h3>
              <p className="text-gray-300">
                Eye-catching label designs that effectively communicate your product's value.
              </p>
            </a>
            <a
              href="/services/flex-design"
              className="p-6 bg-[#1a1a1a] rounded-lg text-center gsap-fade-up transition-transform transform hover:scale-105 hover:bg-[#2a2a2a]"
            >
              <h3 className="text-2xl font-bold mb-4 transition-colors text-[#00ffff]">
                Flex Design
              </h3>
              <p className="text-gray-300">
                High-quality flex designs for impactful advertising and branding.
              </p>
            </a>
            <a
              href="/services/catalog-design"
              className="p-6 bg-[#1a1a1a] rounded-lg text-center gsap-fade-up transition-transform transform hover:scale-105 hover:bg-[#2a2a2a]"
            >
              <h3 className="text-2xl font-bold mb-4 transition-colors text-[#00ffff]">
                Catalog Design
              </h3>
              <p className="text-gray-300">
                Professionally designed catalogs to showcase your products and services.
              </p>
            </a>
            <a
              href="/services/brochure-design"
              className="p-6 bg-[#1a1a1a] rounded-lg text-center gsap-fade-up transition-transform transform hover:scale-105 hover:bg-[#2a2a2a]"
            >
              <h3 className="text-2xl font-bold mb-4 transition-colors text-[#00ffff]">
                Brochure Design
              </h3>
              <p className="text-gray-300">
                Creative and informative brochures to effectively communicate your message.
              </p>
            </a>
            <a
              href="/services/banner-design"
              className="p-6 bg-[#1a1a1a] rounded-lg text-center gsap-fade-up transition-transform transform hover:scale-105 hover:bg-[#2a2a2a]"
            >
              <h3 className="text-2xl font-bold mb-4 transition-colors text-[#00ffff]">
                Banner Design
              </h3>
              <p className="text-gray-300">
                Stunning banner designs for online and offline marketing campaigns.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 gsap-fade-up text-[#ff6d00]">
            Recent Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentWorks.length > 0 ? (
              recentWorks.map((item) => (
                <div key={item._id} className="relative group overflow-hidden rounded-lg gsap-fade-up">
                  <img
                    crossOrigin='anonymous'
                    src={`${API_URL}${item.imageUrl}`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-white text-xl font-bold">{item.title}</h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-300">No recent work available.</p>
            )}
          </div>
        </div>
      </section>


      {/* Client Testimonials Section - Dynamic */}
      <TestimonialSlider />


      {/* Add the Google Reviews widget */}
      {/* <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 gsap-fade-up text-[#ff6d00]">
            Customer Reviews
          </h2>
          <GoogleReviewsWidget />
        </div>
      </section> */}


      {/* Call-to-Action */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 gsap-fade-up text-[#ff6d00]">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-lg text-gray-200 mb-8 gsap-fade-up text-[#00ffff]">
            Contact us today to get started on your next big project.
          </p>
          <button
            className="button-gradient px-8 py-3 rounded-lg font-medium text-white gsap-fade-up"
            onClick={() => (window.location.href = '/contact')}
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
