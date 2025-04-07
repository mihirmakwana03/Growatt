import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReCAPTCHA from 'react-google-recaptcha';
import { Briefcase, Users, MapPin, Clock, Upload, Building, Star, Trophy, Heart } from 'lucide-react';

const jobOpenings = [
  {
    id: 'senior-react-dev',
    title: 'Senior React Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for an experienced React developer to join our team and help build amazing web applications.',
    requirements: [
      'Minimum 5 years of experience with React',
      'Strong understanding of modern JavaScript',
      'Experience with TypeScript',
      'Knowledge of state management solutions',
    ],
    responsibilities: [
      'Develop new features for our web applications',
      'Optimize application performance',
      'Mentor junior developers',
      'Contribute to technical architecture decisions',
    ],
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Hybrid',
    type: 'Full-time',
    description: 'Join our design team to create beautiful and intuitive user interfaces for our clients.',
    requirements: [
      'Minimum 3 years of UI/UX design experience',
      'Proficiency in Figma',
      'Strong portfolio showcasing web/mobile designs',
      'Understanding of user-centered design principles',
    ],
    responsibilities: [
      'Create user-centered designs',
      'Conduct user research',
      'Create wireframes and prototypes',
      'Collaborate with developers',
    ],
  },
];

const benefits = [
  {
    icon: Building,
    title: 'Modern Office',
    description: 'State-of-the-art facilities with recreational areas',
  },
  {
    icon: Star,
    title: 'Career Growth',
    description: 'Regular training and skill development opportunities',
  },
  {
    icon: Trophy,
    title: 'Recognition',
    description: 'Regular awards and recognition programs',
  },
  {
    icon: Heart,
    title: 'Health Benefits',
    description: 'Comprehensive health insurance coverage',
  },
];

const testimonials = [
  {
    name: 'Diya Patel',
    position: 'Senior Developer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    quote: 'Working here has been an amazing journey of growth and learning.',
  },
  {
    name: 'Manish Sharma',
    position: 'UI Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    quote: 'The collaborative environment and creative freedom are unmatched.',
  },
];

export default function Career() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    resume: null,
    coverLetter: null,
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleFileChange = (type) => (event) => {
    const file = event.target.files?.[0] || null;
    setApplicationData((prev) => ({ ...prev, [type]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaValue) {
      alert('Please complete the reCAPTCHA verification');
      return;
    }
    // Handle application submission
    console.log(applicationData);
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6"><span className="text-gradient">Join Our Team</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Be part of an innovative team that's shaping the future of digital experiences.
          </p>
        </motion.div>

        {/* Company Culture */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl text-center"
              >
                <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Team Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="glass p-8 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-gray-300">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="grid gap-6">
            {jobOpenings.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" /> {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="button-gradient px-6 py-2 rounded-lg font-medium"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-6">Apply for {selectedJob.title}</h2>

              <div className="mb-8">
                <h3 className="font-bold mb-2">Job Description</h3>
                <p className="text-gray-300 mb-4">{selectedJob.description}</p>

                <h3 className="font-bold mb-2">Requirements</h3>
                <ul className="list-disc list-inside text-gray-300 mb-4">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>

                <h3 className="font-bold mb-2">Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
              </form>
            </motion.div>
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                type="text"
                required
                className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
                value={applicationData.name}
                onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                required
                className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
                value={applicationData.email}
                onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium mb-2">Resume (PDF/DOC) *</label>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm">Click to upload resume</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange('resume')}
                      required
                    />
                  </label>
                </div>
                {applicationData.resume && (
                  <p className="mt-2 text-sm text-gray-300">
                    Selected file: {applicationData.resume.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cover Letter (Optional)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm">Click to upload cover letter</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange('coverLetter')}
                    />
                  </label>
                </div>
                {applicationData.coverLetter && (
                  <p className="mt-2 text-sm text-gray-300">
                    Selected file: {applicationData.coverLetter.name}
                  </p>
                )}
              </div>

              <ReCAPTCHA
                sitekey="your-recaptcha-site-key"
                onChange={(value) => setRecaptchaValue(value)}
                theme="dark"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="button-gradient flex-1 py-3 rounded-lg font-medium"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {/* Work Environment Photos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.img
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                  alt="Office space"
                  className="rounded-xl w-full h-64 object-cover"
                />
                <motion.img
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
                  alt="Team collaboration"
                  className="rounded-xl w-full h-64 object-cover"
                />
                <motion.img
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="Team meeting"
                  className="rounded-xl w-full h-64 object-cover"
                />
              </div>
            </div>
          </div >
        )}
      </div >
    </div >
  );
}
