import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
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
      { name: 'Facebook', href: 'https://www.facebook.com/Growattinfo/', icon: Facebook },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'Instagram', href: 'https://www.instagram.com/growatt_info/', icon: Instagram },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/company/growatt-infosystem/', icon: Linkedin },
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
                    href="https://maps.app.goo.gl/iVuTrZzhYArCbiVM9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    831, RK Empire, 150 Feet Ring Road, Rajkot, India, 360004
                  </a>
                  </p>
                  <p className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <a
                    href="tel:+918155808720"
                    className="hover:text-primary transition-colors"
                  >
                    +91 81558 08720
                  </a>
                  </p>
                  <p className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <a
                    href="mailto:growattinfosystem@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    growattinfosystem@gmail.com
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