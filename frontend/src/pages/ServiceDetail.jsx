import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { services } from "../data/services";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ServiceDetail() {
  const [pricing, setPricing] = useState(null);
  const { service: serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === serviceId);
  const sectionRef = useRef(null);

  // ✅ Added state to store portfolio
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/portfolio")
      .then((res) => setPortfolio(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/pricing")
      .then((res) => {
        console.log("Pricing data:", res.data); // Debug: See what's coming back

        const formatId = (str) =>
          typeof str === "string"
            ? str.toLowerCase().trim().replace(/\s+/g, "-")
            : "";

        const filtered = res.data.find(
          (item) =>
            formatId(item?.title.replace(/plans?/i, "").trim()) ===
            formatId(serviceId)
        );

        setPricing(filtered);
      })
      .catch((err) => console.error("Pricing error:", err));
  }, [serviceId]);

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
          <h1 className="text-4xl md:text-5xl font-bold mb-2 pb-4">
            <span className="text-gradient">{service.title}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {service.description}
          </p>
        </motion.div>

        {pricing && (
          <section className="py-2">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-stretch">
                {/* BASIC PLAN */}
                <div className="flex flex-col h-full mx-auto max-w-sm text-gray-100 rounded-2xl bg-gray-800 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-700">
                  <h3 className="text-2xl font-bold mb-3">Basic</h3>
                  <div className="flex items-center mb-6">
                    <span className="mr-2 text-6xl font-semibold">
                      ₹{pricing.basicPrice}
                    </span>
                    <span className="text-xl text-gray-300">/ project</span>
                  </div>
                  <ul className="mb-12 space-y-6 text-left text-lg text-gray-300">
                    {pricing?.features?.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center space-x-4">
                        <Icons.Check className="w-6 h-6 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-auto py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-primary/80">
                    Purchase Plan
                  </button>
                </div>

                {/* ADVANCED PLAN */}
                <div className="flex flex-col h-full mx-auto max-w-sm text-gray-100 rounded-2xl bg-primary/10 transition-all duration-500 hover:bg-primary/20">
                  <div className="uppercase bg-gradient-to-r from-primary to-secondary rounded-t-2xl p-3 text-center text-white">
                    MOST POPULAR
                  </div>
                  <div className="p-6 xl:py-9 xl:px-12 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold mb-3">Advanced</h3>
                    <div className="flex items-center mb-6">
                      <span className="mr-2 text-6xl font-semibold text-primary">
                        ₹{pricing.advancePrice}
                      </span>
                      <span className="text-xl text-gray-300">/ project</span>
                    </div>
                    <ul className="mb-12 space-y-6 text-left text-lg">
                      <li className="text-[#FF6B6B]">Basic Features +</li>
                      {pricing?.features?.slice(3, 6).map((f, i) => (
                        <li key={i} className="flex items-center space-x-4">
                          <Icons.Check className="w-6 h-6 text-primary" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-auto py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit block mx-auto hover:bg-primary/80">
                      Purchase Plan
                    </button>
                  </div>
                </div>

                {/* PREMIUM PLAN */}
                <div className="flex flex-col h-full mx-auto max-w-sm text-gray-100 rounded-2xl bg-gray-800 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-700">
                  <h3 className="text-2xl font-bold mb-3">Premium</h3>
                  <div className="flex items-center mb-6">
                    <span className="mr-2 text-6xl font-semibold">
                      ₹{pricing.premiumPrice}
                    </span>
                    <span className="text-xl text-gray-300">/ project</span>
                  </div>
                  <ul className="mb-12 space-y-6 text-left text-lg text-gray-300">
                    <li className="text-[#FF6B6B]">Advance Features +</li>
                    {pricing?.features?.slice(6, 10).map((f, i) => (
                      <li key={i} className="flex items-center space-x-4">
                        <Icons.Check className="w-6 h-6 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-auto py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-primary/80">
                    Purchase Plan
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="my-16">
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

        {/* Portfolio - Filtered */}
        <h2 className="text-3xl font-bold text-center mb-12">Recent Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio
            .filter(
              (item) =>
                item.type.toLowerCase().replace(/\s+/g, "-") ===
                serviceId.toLowerCase()
            )
            .slice(0, 3) // Limit to first 3 results
            .map((item, index) => (
              <div key={index} className="glass overflow-hidden rounded-xl">
                <img
                  crossOrigin="anonymous"
                  src={`${API_URL}${item.imageUrl}`}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
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
  );
}
