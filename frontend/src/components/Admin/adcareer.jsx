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
<<<<<<< HEAD
=======
    jobResponse: "",
    jobRequire: "",
>>>>>>> a4bac4c (first commit)
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
      await axios.delete(`${API_URL}/delete-expired`, { data: { currentDate } });

      // ✅ Filter active careers
      const activeCareers = response.data.filter((career) => career.jobEndDate >= currentDate);

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
<<<<<<< HEAD
=======
        jobRequire: "",
        jobResponse: "",
>>>>>>> a4bac4c (first commit)
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
    if (!window.confirm("Are you sure you want to delete this career listing?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setCareers((prev) => prev.filter((career) => career._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete career:", error);
      setError("Failed to delete career. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold text-blue-600 mb-4">Career Opportunity</h2>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

      <div className="text-center mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <FaUpload /> Add Career
        </button>
        <hr className="my-4" />
      </div>

      {loading && <p className="text-center text-gray-500">Loading careers...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {careers.length > 0 ? (
          careers.map((career) => (
            <div className="bg-white text-black shadow-md rounded p-4" key={career._id}>
              <p className="font-semibold">
                <strong>Job Title:</strong> {career.jobTitle}
              </p>
              <p>
<<<<<<< HEAD
=======
                <strong>Job Description:</strong> {career.shortDescription}
              </p>
              <p>
                <strong>Responsibilities:</strong> {career.jobResponse}
              </p>
              <p>
                <strong>Requirements:</strong> {career.jobRequire}
              </p>
              <p>
>>>>>>> a4bac4c (first commit)
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
        ) : (
          !loading && <p className="text-center text-gray-500">No Career Listings Available</p>
        )}
      </div>

      {/* Career Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add Career</h3>
            <form onSubmit={handleInsertCareer}>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Job Title</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 bg-white"
                  name="jobTitle"
                  value={formState.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
<<<<<<< HEAD
                <label className="block font-semibold mb-1">Short Description</label>
=======
                <label className="block font-semibold mb-1">Job Description</label>
>>>>>>> a4bac4c (first commit)
                <input
                  type="text"
                  className="w-full border rounded p-2 bg-white"
                  name="shortDescription"
                  value={formState.shortDescription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
<<<<<<< HEAD
=======
                <label className="block font-semibold mb-1">Responsibilities</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 bg-white"
                  name="jobResponse"
                  value={formState.jobResponse}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Requirements</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 bg-white"
                  name="jobRequire"
                  value={formState.jobRequire}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
>>>>>>> a4bac4c (first commit)
                <label className="block font-semibold mb-1">Location</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 bg-white"
                  name="jobLocation"
                  value={formState.jobLocation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Job Type</label>
                <select
                  className="w-full border rounded p-2 bg-white"
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

              <div className="mb-4">
                <label className="block font-semibold mb-1">Job End Date</label>
                <input
                  type="date"
                  className="w-full border rounded p-2 bg-white"
                  name="jobEndDate"
                  value={formState.jobEndDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]} // Prevents past dates
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
              >
                Add Career
              </button>
            </form>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-md shadow hover:bg-gray-500 p-2 mt-4 w-full"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerSection;
