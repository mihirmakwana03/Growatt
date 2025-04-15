import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReCAPTCHA from "react-google-recaptcha";
import {
  MapPin,
  Clock,
  Upload,
  Building,
  Star,
  Trophy,
  Heart,
} from "lucide-react";

const benefits = [
  {
    icon: Building,
    title: "Modern Office",
    description: "State-of-the-art facilities with recreational areas",
  },
  {
    icon: Star,
    title: "Career Growth",
    description: "Regular training and skill development opportunities",
  },
  {
    icon: Trophy,
    title: "Recognition",
    description: "Regular awards and recognition programs",
  },
  {
    icon: Heart,
    title: "Health Benefits",
    description: "Comprehensive health insurance coverage",
  },
];

export default function Career() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [teamMembers, setTeamStories] = useState([]);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: null,
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    fetch("http://localhost:5000/careers", { mode: "cors" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/teamstories')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch team stories');
        }
        return res.json();
      })
      .then((data) => setTeamStories(data))
      .catch((err) => {
        console.error('TeamStories Error:', err);
        setError(err.message);
      });
  }, []);

  const handleFileChange = (type) => (event) => {
    const file = event.target.files?.[0] || null;
    setApplicationData((prev) => ({ ...prev, [type]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !applicationData.name ||
      !applicationData.email ||
      !applicationData.resume ||
      applicationData.experience === "" ||
      applicationData.twelvethPercentage === "" ||
      applicationData.bachelorsDegree === ""
    ) {
      alert("All fields are required!");
      return;
    }

    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA verification");
      return;
    }

    const applicationFormData = new FormData();
    applicationFormData.append("jobId", selectedJob._id);
    applicationFormData.append("jobTitle", selectedJob.jobTitle);
    applicationFormData.append("name", applicationData.name);
    applicationFormData.append("email", applicationData.email);
    applicationFormData.append("experience", applicationData.experience);
    applicationFormData.append(
      "twelvethPercentage",
      applicationData.twelvethPercentage
    );
    applicationFormData.append(
      "bachelorsDegree",
      applicationData.bachelorsDegree
    );
    applicationFormData.append("resume", applicationData.resume);
    applicationFormData.append("captcha", recaptchaValue); // ✅ Include reCAPTCHA token

    try {
      const response = await fetch("http://localhost:5000/applications", {
        method: "POST",
        body: applicationFormData,
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to submit application");

      alert("Application submitted successfully!");

      setApplicationData({
        name: "",
        email: "",
        resume: null,
        experience: "",
        twelvethPercentage: "",
        bachelorsDegree: "",
      });

      setSelectedJob(null);
    } catch (error) {
      alert(error.message);
    }
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
            <span className="text-gradient">Join Our Team</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Be part of an innovative team that's shaping the future of digital
            experiences.
          </p>
        </motion.div>

        {/* Company Culture */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Work With Us
          </h2>
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

        {/* Team Stories */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Team Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-black text-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`http://localhost:5000/storyImg/${story.image}`}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                    crossOrigin="anonymous"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{story.name}</h3>
                    <p className="text-white-600 text-sm">{story.designation}</p>
                  </div>
                </div>
                <p className="text-white-700 italic">"{story.message}"</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Open Positions
          </h2>
          {loading && (
            <p className="text-center text-gray-300">Loading jobs...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="grid gap-6">
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.jobTitle}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {job.jobLocation}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {job.jobType}
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
              <h2 className="text-2xl font-bold mb-6">
                Apply for {selectedJob.jobTitle}
              </h2>
              <div className="mb-8">
                <h3 className="font-bold mb-2">Job Description</h3>
                <p className="text-gray-300 mb-4">
                  {selectedJob.shortDescription}
                </p>
              </div>
              <div className="mb-8">
                <h3 className="font-bold mb-2">Requirements</h3>
                <ul className="list-disc list-inside text-sm text-white-800">
                  {selectedJob.jobRequire.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="font-bold mb-2">Responsiblities</h3>
                <ul className="list-disc list-inside text-sm text-white-800">
                  {selectedJob.jobResponse.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
                    value={applicationData.name}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
                    value={applicationData.email}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Experience (in years) *
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
                    value={applicationData.experience || ""}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        experience: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    12th Percentage *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
                    value={applicationData.twelvethPercentage || ""}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        twelvethPercentage: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Bachelor's Percentage *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="w-full bg-white/5 rounded-lg border border-white/10 p-3"
                    value={applicationData.bachelorsDegree || ""}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        bachelorsDegree: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Resume (PDF/DOC) *
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10">
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="text-sm">Click to upload resume</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange("resume")}
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

                <div className="mt-4 mb-4">
                  <ReCAPTCHA
                    sitekey="6LdtrvgqAAAAABmj3YRQhv7d-YzEOjkts7TyH9gR"
                    onChange={(value) => setRecaptchaValue(value)}
                    theme="dark"
                  />
                </div>

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
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
