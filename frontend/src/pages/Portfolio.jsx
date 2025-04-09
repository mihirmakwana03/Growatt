import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const types = [
  'All',
  'Logo Design',
  'Brand Identity',
  'Packaging Design',
  'Business Card Design',
  'Letterheads',
  'Label Design',
  'Flex Design',
  'Catalog Design',
  'Brochure Design',
  'Banner Design'
];

export default function Portfolio() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [error, setError] = useState('');

  // Fetch all portfolio items from the backend when the component mounts.
  useEffect(() => {
    axios.get(`${API_URL}/portfolio`)
      .then((response) => {
        // Expecting response.data to be an array of items.
        setPortfolioItems(response.data);
      })
      .catch((err) => {
        console.error("Error fetching portfolio:", err);
        setError("Failed to fetch portfolio items.");
      });
  }, []);

  // Filter the portfolio items each time either the active category or the fetched items change.
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredItems(portfolioItems);
    } else {
      const filtered = portfolioItems.filter(item => {
        const itemType = item.type ? item.type.trim().toLowerCase() : '';
        // console.log('Comparing:', itemType, 'with', activeCategory.trim().toLowerCase());
        return itemType === activeCategory.trim().toLowerCase();
      });
      setFilteredItems(filtered);
    }
  }, [activeCategory, portfolioItems]);


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

        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {types.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'glass hover:bg-primary/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass overflow-hidden rounded-xl group"
              >
                <div className="relative overflow-hidden">
                  <img
                    crossOrigin="anonymous"
                    src={`${API_URL}${item.imageUrl}`}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <span className="text-sm text-primary font-medium">
                        {item.type}
                      </span>
                      <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                      <p className="text-gray-300 mt-2">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-muted">No Portfolio Items Available</p>
          )}
        </div>
      </div>
    </div>
  );
}
