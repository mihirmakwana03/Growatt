import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Users, Target, Award, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '500+',
    label: 'Happy Clients',
  },
  {
    icon: Target,
    value: '98%',
    label: 'Project Success Rate',
  },
  {
    icon: Award,
    value: '15+',
    label: 'Industry Awards',
  },
  {
    icon: Clock,
    value: '6+',
    label: 'Years Experience',
  },
];

export default function About() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/team');
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  // Helper to extract number and suffix (e.g., '+' or '%' etc.)
  const parseStatValue = (value) => {
    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');
    return { numericPart, suffix };
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">About</span>
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Growatt Infosystem
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Welcome to GROWATT INFOSYSTEM, a leading logo and branding agency helping businesses create a strong brand identity.
            Our team of designers, developers, and branding specialists work together to help our clients achieve their business goals.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const { numericPart, suffix } = parseStatValue(stat.value);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">
                  <CountUp start={0} end={numericPart} duration={3.5} />{suffix}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Leadership Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="glass p-8 rounded-xl"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <img
                    crossOrigin="anonymous"
                    src={`http://localhost:5000/membersImg/${member.image}`}
                    alt={member.name}
                    className="w-40 h-40 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary mb-4">{member.designation}</p>
                    <p className="text-gray-300 mb-4">{member.bio}</p>
                    <div className="flex gap-4">
                      <a
                        href={`https://www.linkedin.com/in/${member.social}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark transition duration-200"
                      >
                        LinkedIn
                      </a> 
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company Values */}
        <div className="text-center mb-20 mt-20">
          <h2 className="text-3xl font-bold mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-xl"
            >
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-300">
                We constantly push boundaries and explore new creative solutions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass p-8 rounded-xl"
            >
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-300">
                We strive for perfection in every project we undertake.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-8 rounded-xl"
            >
              <h3 className="text-xl font-bold mb-4">Collaboration</h3>
              <p className="text-gray-300">
                We work closely with our clients to achieve their vision.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-gray-300 mb-8">
            Let's create something amazing for your brand.
          </p>
          <a
            href="/contact"
            className="button-gradient px-8 py-3 rounded-lg font-medium inline-block"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
}
