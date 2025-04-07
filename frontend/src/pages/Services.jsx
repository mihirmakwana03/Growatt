import { useRef } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

export default function Services() {
  const sectionRef = useRef(null);

  return (
    <div ref={sectionRef} className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-gradient">Our Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive design solutions tailored to elevate your brand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
