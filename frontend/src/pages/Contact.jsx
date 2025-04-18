import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReCAPTCHA from 'react-google-recaptcha';
import { Phone, Mail, MapPin, Clock, Linkedin, Send, Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from 'lucide-react';

const socialLinks = [
    { icon: FacebookIcon, href: 'https://www.facebook.com/Growattinfo/', label: 'Facebook' },
    { icon: TwitterIcon, href: '#', label: 'Twitter' },
    { icon: InstagramIcon, href: 'https://www.instagram.com/growatt_info/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/growatt-infosystem/', label: 'LinkedIn' },
];

const contactInfo = [
    {
        icon: Phone,
        title: 'Phone',
        content: '+91 81558 08720',
        link: 'tel:+918155808720',
    },
    {
        icon: Mail,
        title: 'Email',
        content: 'growattinfosystem@gmail.com',
        link: 'mailto:growattinfosystem@gmail.com',
    },
    {
        icon: MapPin,
        title: 'Address',
        content: '831, RK Empire, 150 Feet Ring Road, Rajkot, India, 360004',
        link: 'https://maps.app.goo.gl/iVuTrZzhYArCbiVM9',
    },
    {
        icon: Clock,
        title: 'Business Hours',
        content: 'Mon - Sat: 9:00 AM - 5:00 PM',
    },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        countryCode: '+91',
        phone: '',
        message: '',
    });
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!recaptchaValue) {
            alert('Please complete the reCAPTCHA verification');
            return;
        }
        
        if (!formData.fullName || !formData.email || !formData.message) {
            alert("Please fill in all required fields: Full Name, Email, and Message.");
            setLoading(false);
            return;
          }
          if (!formData.phone) {
            alert("Please provide your phone number.");
            setLoading(false);
            return;
          }
          
        // Prepare the payload; adjust phone format if needed
        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.countryCode.replace('+', '') + formData.phone,

            message: formData.message,
            captcha: recaptchaValue,
        };
        
        console.log("Submitting payload:", payload);
        
        setLoading(true);
        
        try {
            const response = await fetch("http://localhost:5000/contact/submitcontact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            
            const data = await response.json();

            if (!response.ok) {
                console.error("Submission error:", data);
                setResponseMessage("❌ Error: " + data.error + (data.details ? " (" + JSON.stringify(data.details) + ")" : ""));
              }
              
            
            if (response.ok) {
                setResponseMessage("✅ Form submitted successfully!");
                setFormData({
                    fullName: '',
                    email: '',
                    countryCode: '+91', // ensure you reset to default if needed
                    phone: '',
                    message: '',
                });
            } else {
                setResponseMessage("❌ Error: " + data.error);
                console.error("Submission error:", data);
            }
        } catch (error) {
            console.error("❌ Submission error:", error);
            setResponseMessage("❌ Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    const onRecaptchaChange = useCallback((value) => {
        setRecaptchaValue(value);
    }, []);

    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-gradient">Get in Touch</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Have a project in mind? We'd love to hear from you. Send us a message and we'll respond within 24-48 hours.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Contact Form */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="glass p-8 rounded-xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Phone Number</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="+91"
                                        className="w-1/6 bg-white/5 rounded-lg border border-white/10 p-2"
                                        value={formData.countryCode || '+91'}
                                        onChange={(e) =>
                                            setFormData({ ...formData, countryCode: e.target.value })
                                        }
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="w-5/6 bg-white/5 rounded-lg border border-white/10 p-3"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Message *</label>
                                <textarea
                                    required
                                    placeholder="Describe the service you want, duration and style, color, or theme"
                                    rows={4}
                                    className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                ></textarea>
                            </div>
                            <ReCAPTCHA
                                sitekey="6LdtrvgqAAAAABmj3YRQhv7d-YzEOjkts7TyH9gR"
                                onChange={onRecaptchaChange}
                                theme="dark"
                            />
                            <button
                                type="submit"
                                className="button-gradient w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : <><Send className="w-5 h-5" /> Send Message</>}
                            </button>
                        </form>
                        {responseMessage && <p className="mt-3 text-center">{responseMessage}</p>}
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="glass p-8 rounded-xl">
                            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                            <div className="grid gap-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/20 rounded-lg">
                                            <info.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1">{info.title}</h3>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    className="text-gray-300 hover:text-primary transition-colors"
                                                >
                                                    {info.content}
                                                </a>
                                            ) : (
                                                <p className="text-gray-300">{info.content}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-8 rounded-xl">
                            <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="p-3 bg-white/5 rounded-lg hover:bg-primary/20 transition-colors"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-6 h-6" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-8 rounded-xl">
                            <h2 className="text-2xl font-bold mb-6">Our Location</h2>
                            <div className="overflow-hidden rounded-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.775161107958!2d70.78644119316607!3d22.262735064931444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca5dbe7afda3%3A0x6d8e1af5be0f4126!2sRK%20Empire!5e0!3m2!1sen!2sin!4v1743027493119!5m2!1sen!2sin"
                                    width="600"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-96"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center glass p-6 rounded-xl"
                >
                    <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">Quick Response Time</h2>
                    <p className="text-gray-300">
                        We typically respond to all inquiries within 24-48 hours during business days.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
