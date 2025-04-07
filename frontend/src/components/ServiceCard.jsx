import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function ServiceCard({ service, index }) {
  const Icon = Icons[service.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass p-6 rounded-xl hover:scale-105 transition-transform duration-300"
    >
      <Link to={`/services/${service.id}`} className="block">
        <div className="flex items-center justify-between mb-4">
          <Icon className="w-12 h-12 text-primary" />
          <span className="text-sm font-medium text-primary">{service.price}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
        <p className="text-gray-300">{service.description}</p>
        <ul className="mt-4 space-y-2">
          {service.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-center text-sm text-gray-300">
              <Icons.Check className="w-4 h-4 text-primary mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </Link>
    </motion.div>
  );
}
