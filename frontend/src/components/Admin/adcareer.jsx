import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/careers"; // ✅ API Endpoint

const CareerSection = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({
    jobTitle: "",
    shortDescription: "",
    jobResponse: "",
    jobRequire: "",
    jobLocation: "",
    jobType: "full-time",
    jobEndDate: "",
  });

  // Fetch Careers and Remove Expired Jobs
  useEffect(() => {
    fetchAndCleanCareers();
    const interval = setInterval(fetchAndCleanCareers, 86400000);
    return () => clearInterval(interval);
  }, []);

  const fetchAndCleanCareers = async () => {
    try {
      const response = await axios.get(API_URL);
      const currentDate = new Date().toISOString().split("T")[0];

      // ✅ Remove expired jobs from the backend
      await axios.delete(`${API_URL}/delete-expired`, {
        data: { currentDate },
      });

      // ✅ Filter active careers
      const activeCareers = response.data.filter(
        (career) => career.jobEndDate >= currentDate
      );

      setCareers(activeCareers);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch careers. Please try again later.");
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Insert Career
  const handleInsertCareer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formState);
      setCareers([...careers, response.data.career]);
      setShowForm(false);
      setFormState({
        jobTitle: "",
        shortDescription: "",
        jobRequire: "",
        jobResponse: "",
        jobLocation: "",
        jobType: "full-time",
        jobEndDate: "",
      });
    } catch (error) {
      setError("Failed to add career. Please try again.");
    }
  };

  // ✅ Delete a specific career
  const handleDeleteCareer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this career listing?"))
      return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setCareers((prev) => prev.filter((career) => career._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete career:", error);
      setError("Failed to delete career. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 pt-5 min-h-screen bg-gray-300">
      <h1 className="text-center text-2xl font-bold text-blue-600 mb-4">Career Opportunity</h1>
        <hr className="my-4 border-gray-600" />

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}

      <div className="text-center mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <FaUpload /> Add Career
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Loading careers...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {careers.length > 0
          ? careers.map((career) => (
            <div
              className="bg-white text-black shadow-md rounded p-4"
              key={career._id}
            >
              <p className="font-semibold">
                <strong>Job Title:</strong> {career.jobTitle}
              </p>
              <p>
                <strong>Job Description:</strong> {career.shortDescription}
              </p>
              <p>
                <strong>Location:</strong> {career.jobLocation}
              </p>
              <p>
                <strong>Type:</strong> {career.jobType}
              </p>
              <p>
                <strong>Ending Date:</strong>{" "}
                {career.jobEndDate ? career.jobEndDate.split("T")[0] : "N/A"}
              </p>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded mt-2 hover:bg-red-700 flex items-center gap-2"
                onClick={() => handleDeleteCareer(career._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))
          : !loading && (
            <p className="text-center text-gray-500">
              No Career Listings Available
            </p>
          )}
      </div>

      {/* Career Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
            <h3 className="text-xl font-bold mb-4 text-center">Add Career</h3>
            <form onSubmit={handleInsertCareer}>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Side */}
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Job Title</label>
                    <input
                      type="text"
                      className="w-full border rounded p-2 text-sm bg-white"
                      name="jobTitle"
                      value={formState.jobTitle}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Responsibilities</label>
                    <textarea
                      className="w-full border rounded p-2 text-sm bg-white"
                      name="jobResponse"
                      rows="4"
                      placeholder="• List key responsibilities..."
                      value={formState.jobResponse}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Location</label>
                    <input
                      type="text"
                      className="w-full border rounded p-2 text-sm bg-white"
                      name="jobLocation"
                      value={formState.jobLocation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Job End Date</label>
                    <input
                      type="date"
                      className="w-full border rounded p-2 text-sm bg-white"
                      name="jobEndDate"
                      value={formState.jobEndDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Job Description</label>
                    <textarea
                      className="w-full border rounded p-2 text-sm bg-white"
                      name="shortDescription"
                      rows="4"
                      placeholder="• Write a brief overview..."
                      value={formState.shortDescription}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Requirements</label>
                    <textarea
                      className="w-full border rounded p-2 text-sm bg-white"
                      name="jobRequire"
                      rows="4"
                      placeholder="• List requirements..."
                      value={formState.jobRequire}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Job Type</label>
                    <select
                      className="w-full border rounded p-2 text-sm bg-white"
                      name="jobType"
                      value={formState.jobType}
                      onChange={handleChange}
                      required
                    >
                      <option value="full-time">Full-Time</option>
                      <option value="part-time">Part-Time</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded w-full md:w-1/2 hover:bg-green-700"
                >
                  Add Career
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded w-full md:w-1/2 hover:bg-gray-500"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerSection;
