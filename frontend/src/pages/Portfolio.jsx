import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import axios from "axios";

const portfolioItems = [
  {
    id: 1,
    title: 'Tech Startup Branding',
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623',
    description: 'Complete brand identity design for an innovative tech startup.',
  },
  {
    id: 2,
    title: 'Restaurant Chain Logo',
    category: 'Logo Design',
    image: 'https://images.unsplash.com/photo-1621111848501-8d3634f82336',
    description: 'Modern and memorable logo design for a premium restaurant chain.',
  },
  {
    id: 3,
    title: 'Product Packaging',
    category: 'Packaging',
    image: 'https://images.unsplash.com/photo-1605641532626-3246207c89a8',
    description: 'Innovative packaging design for a luxury skincare brand.',
  },
  {
    id: 4,
    title: 'Fashion Catalog',
    category: 'Catalog Design',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e',
    description: 'Elegant catalog design for a high-end fashion boutique.',
  },
  {
    id: 5,
    title: 'Event Branding',
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    description: 'Complete branding solution for an international tech conference.',
  },
  {
    id: 6,
    title: 'Corporate Stationery',
    category: 'Business Cards',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338',
    description: 'Professional stationery design for a consulting firm.',
  },
];

const categories = ['All', 'Brand Identity', 'Logo Design', 'Packaging', 'Catalog Design', 'Business Cards'];

export default function Portfolio() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(portfolioItems);

  useEffect(() => {
    setFilteredItems(
      activeCategory === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeCategory)
    );
  }, [activeCategory]);

  return (
    <div ref={sectionRef} className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-gradient">Our Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Showcasing our creative excellence through successful client projects
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'glass hover:bg-primary/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="glass overflow-hidden rounded-xl group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <span className="text-sm text-primary font-medium">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                    <p className="text-gray-300 mt-2">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
