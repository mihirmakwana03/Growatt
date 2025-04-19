import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
    address: '',
    mapLink: '',
    socialLinks: {},
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await fetch('http://localhost:5000/contactinfo');
        const data = await res.json();
        setContactInfo({
          phone: data.phone,
          email: data.email,
          address: data.address,
          mapLink: data.mapLink || 'https://maps.app.goo.gl/iVuTrZzhYArCbiVM9',
          socialLinks: data.socialLinks || {},
        });
      } catch (err) {
        // fallback or error handling
      }
    };
    fetchContactInfo();
  }, []);

  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Career', href: '/career' },
    ],
    social: [
      {
        name: 'Facebook',
        href: contactInfo.socialLinks.facebook
          ? `https://facebook.com/${contactInfo.socialLinks.facebook}`
          : '#',
        icon: FacebookIcon,
      },
      {
        name: 'Twitter',
        href: contactInfo.socialLinks.twitter
          ? `https://twitter.com/${contactInfo.socialLinks.twitter}`
          : '#',
        icon: TwitterIcon,
      },
      {
        name: 'Instagram',
        href: contactInfo.socialLinks.instagram
          ? `https://instagram.com/${contactInfo.socialLinks.instagram}`
          : '#',
        icon: InstagramIcon,
      },
      {
        name: 'LinkedIn',
        href: contactInfo.socialLinks.linkedin
          ? `https://linkedin.com/company/${contactInfo.socialLinks.linkedin}`
          : '#',
        icon: Linkedin,
      },
    ],
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Growatt Infosystem</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <MapPin className="w-9 h-9" />
                <a
                  href={contactInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {contactInfo.address || '831, RK Empire, 150 Feet Ring Road, Rajkot, India, 360004'}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {contactInfo.phone || '+91 81558 08720'}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {contactInfo.email || 'growattinfosystem@gmail.com'}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for updates</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p>© {new Date().getFullYear()} Growatt Infosystem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}