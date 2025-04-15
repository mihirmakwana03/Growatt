import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { services } from "../data/services";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ServiceDetail() {
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
  }, []);

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-10 text-gradient">
            {service.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {service.description}
          </p>
        </motion.div>

        {/* Pricing Section */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* <div className="mb-12">
              <h2 className="text-5xl text-center font-bold text-gray-100 mb-4">
                Choose your plan
              </h2>
              <p className="text-gray-300 text-center leading-6 mb-9">
                7 Days free trial. No credit card required.
              </p>
              
              <div className="flex justify-center items-center">
                <label className="min-w-[3.5rem] text-xl relative text-gray-100 mr-4 font-medium">
                  Bill Monthly
                </label>
                <input
                  type="checkbox"
                  id="basic-with-description"
                  className="relative shrink-0 w-11 h-6 p-0.5 bg-primary/20 checked:bg-primary rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:border-blue-600 appearance-none before:inline-block before:w-5 before:h-5 before:bg-primary checked:before:bg-primary before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:transition before:ease-in-out before:duration-200"
                />
                <label className="relative min-w-[3.5rem] font-medium text-xl text-gray-300 ml-4">
                  Bill Yearly
                </label>
              </div>
              
            </div> */}
            {/* Grid */}
            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-center">
              {/* Pricing Card */}
              <div className="flex flex-col mx-auto max-w-sm text-gray-100 rounded-2xl bg-gray-800 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-700">
                <h3 className="text-2xl font-bold mb-3">Free</h3>
                <div className="flex items-center mb-6">
                  <span className="mr-2 text-6xl font-semibold">$0</span>
                  <span className="text-xl text-gray-300">/ month</span>
                </div>
                {/* List */}
                <ul className="mb-12 space-y-6 text-left text-lg text-gray-300">
                  <li className="flex items-center space-x-4">
                    <Icons.Check className="w-6 h-6 text-primary" />
                    <span>2 auto tracking</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Icons.Check className="w-6 h-6 text-primary" />
                    <span>7 Day transaction clearing</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Icons.Check className="w-6 h-6 text-primary" />
                    <span>24/7 Customer support</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Icons.Check className="w-6 h-6 text-primary" />
                    <span>All widget access</span>
                  </li>
                </ul>
                <button className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-primary/80">
                  Purchase Plan
                </button>
                {/* List End */}
              </div>
              {/* Pricing Card */}
              <div className="flex flex-col mx-auto max-w-sm text-gray-100 rounded-2xl bg-primary/10 transition-all duration-500 hover:bg-primary/20">
                <div className="uppercase bg-gradient-to-r from-primary to-secondary rounded-t-2xl p-3 text-center text-white">
                  MOST POPULAR
                </div>
                <div className="p-6 xl:py-9 xl:px-12">
                  <h3 className="text-2xl font-bold mb-3">Advanced</h3>
                  <div className="flex items-center mb-6">
                    <span className="mr-2 text-6xl font-semibold text-primary">$150</span>
                    <span className="text-xl text-gray-300">/ month</span>
                  </div>
                  {/* List */}
                  <ul className="mb-12 space-y-6 text-left text-lg">
                    <li className="flex items-center space-x-4">
                      <Icons.Check className="w-6 h-6 text-primary" />
                      <span>AI Advisor</span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <Icons.Check className="w-6 h-6 text-primary" />
                      <span>Unlimited auto tracking</span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <Icons.Check className="w-6 h-6 text-primary" />
                      <span>1 Day transaction clearing</span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <Icons.Check className="w-6 h-6 text-primary" />
                      <span>Priority customer support</span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <Icons.Check className="w-6 h-6 text-primary" />
                      <span>All Widget Access</span>
                    </li>
                  </ul>
                  <button className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit block mx-auto hover:bg-primary/80">
                    Purchase Plan
                  </button>
                  {/* List End */}
                </div>
              </div>
              {/* Pricing Card */}
              <div className="flex flex-col mx-auto max-w-sm text-gray-100 rounded-2xl bg-gray-800 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-700">
                <h3 className="text-2xl font-bold mb-3">Team</h3>
                <div className="flex items-center mb-6">
                  <span className="mr-2 text-6xl font-semibold">$180</span>
                  <span className="text-xl text-gray-300">/ month</span>
                </div>
                {/* List */}
                <ul className="mb-12 space-y-6 text-left text-lg text-gray-300">
                  <li className="flex items-center space-x-4">
                    <Icons.Check className="w-6 h-6 text-primary" />
                    <span>AI Advisor</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Icons.Check className="w-6 h-6 text-primary" />
                    <span>Unlimited auto tracking</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Icons.Check className="w-6 h-6 text-primary" />
                    <span>1 Day transaction clearing</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Icons.Check className="w-6 h-6 text-primary" />
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Icons.Check className="w-6 h-6 text-primary" />
                    <span>All Widget Access</span>
                  </li>
                </ul>
                <button className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-primary/80">
                  Purchase Plan
                </button>
                {/* List End */}
              </div>
            </div>
            {/* Grid End */}
          </div>
        </section>
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

        {/* Portfolio - Filtered*/}
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
