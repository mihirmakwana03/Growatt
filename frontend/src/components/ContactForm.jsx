import { useState } from 'react';
import { motion } from 'framer-motion';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: '',
    budget: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-xl p-8 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Service Interest</label>
          <select
            className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          >
            <option value="">Select a service</option>
            <option value="web-design">Web Design</option>
            <option value="branding">Branding</option>
            <option value="ui-ux">UI/UX Design</option>
            <option value="mobile-app">Mobile App Design</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Project Description</label>
          <textarea
            className="w-full bg-white/5 rounded-lg border border-white/10 p-3 h-32"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Budget Range</label>
          <select
            className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
            required
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          >
            <option value="">Select budget range</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k+">$50,000+</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="button-gradient mt-6 w-full py-3 px-6 rounded-lg font-semibold text-white"
      >
        Send Message
      </button>
    </motion.form>
  );
}