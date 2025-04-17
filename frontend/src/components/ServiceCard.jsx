import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ServiceCard({ service, index }) {
  const Icon = Icons[service.icon] || Icons.Layout; // fallback icon
  const [pricing, setPricing] = useState(null);

  // Format string to match ID logic
  const formatId = (str) =>
    typeof str === "string"
      ? str.toLowerCase().trim().replace(/\s+/g, "-")
      : "";

  useEffect(() => {
    axios
      .get(`${API_URL}/pricing`)
      .then((res) => {
        const formatId = (str) =>
          typeof str === "string"
            ? str.toLowerCase().trim().replace(/\s+/g, "-")
            : "";

        const match = res.data.find(
          (item) =>
            formatId(item.title.replace(/plans?/i, "")) ===
            formatId(service.title)
        );

        console.log("Matched pricing for", service.title, ":", match);
        setPricing(match);
      })
      .catch((err) => console.error("Pricing error:", err));
  }, [service.title]);

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
          {pricing && (
            <span className="text-sm font-medium text-primary">
              Starting From ₹{pricing?.basicPrice || "N/A"}
            </span>
          )}
        </div>
        {pricing && (
          <>
            <h3 className="text-xl font-bold mb-2">{pricing.title}</h3>
            <p className="text-gray-300">{pricing.description}</p>
            <ul className="mt-4 space-y-2">
              {pricing?.features?.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-center space-x-4">
                  <Icons.Check className="w-6 h-6 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </Link>
    </motion.div>
  );
}
