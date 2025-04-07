import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { services } from '../data/services';

export default function ServiceDetail() {
  const { service: serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === serviceId);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);

  if (!service) return null;

  const Icon = Icons[service.icon];

  return (
    <div ref={sectionRef} className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Icon className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {service.description}
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">What's Included</h2>
            <ul className="space-y-4">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Icons.Check className="w-5 h-5 text-primary mr-3" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Pricing</h2>
            <p className="text-3xl font-bold text-primary">{service.price}</p>
            <button className="button-gradient mt-8 px-8 py-3 rounded-lg font-medium w-full">
              Get Started
            </button>
          </div>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step) => (
              <div key={step.step} className="glass p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Recent Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.portfolio.map((item, index) => (
              <div key={index} className="glass overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
