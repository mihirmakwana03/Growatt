// src/components/TestimonialSlider.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.get(`${API_URL}/testimonials`);
      setTestimonials(res.data);
    } catch (error) {
      console.error("❌ Error fetching testimonials:", error);
    }
  };

  const defaultImage = "/assets/default_client.jpg";

  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 gsap-fade-up text-[#ff6d00]">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.length > 0 ? (
            testimonials.slice(0, 3).map((testimonial) => (
              <div
                key={testimonial._id}
                className="p-6 bg-[#1a1a1a] rounded-lg gsap-fade-up"
              >
                <img
<<<<<<< HEAD
                  src={
                    testimonial.imageUrl ? testimonial.imageUrl : defaultImage
                  }
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <p className="text-gray-300 mb-4">
                  "{testimonial.message}"
                </p>
=======
                  crossOrigin="anonymous"
                  src={`http://localhost:5000${testimonial.imageUrl}`}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <p className="text-gray-300 mb-4">"{testimonial.message}"</p>
>>>>>>> a4bac4c (first commit)
                <div className="mb-2 flex">
                  {Array.from({ length: testimonial.rating || 0 }).map(
                    (_, index) => (
                      <FaStar key={index} size={16} color="#ffc107" />
                    )
                  )}
                </div>
                <h4 className="text-lg font-bold">- {testimonial.name}</h4>
              </div>
            ))
          ) : (
            <p className="text-gray-300">No testimonials available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export { TestimonialSlider };
