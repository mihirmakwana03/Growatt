import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
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
    <div className="container mt-4">
      <h2 className="text-center fw-bold text-primary">Career Opportunity</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <FaUpload /> Add Career
        </button>
        <hr />
      </div>

      {loading && <p className="text-center text-muted">Loading careers...</p>}

      <div className="row">
        {careers.length > 0 ? (
          careers.map((career) => (
            <div className="col-12 col-sm-6 col-md-4 mb-3" key={career._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <p className="card-text"><strong>Job Title:</strong> {career.jobTitle}</p>
                  <p className="card-text"><strong>Location:</strong> {career.jobLocation}</p>
                  <p className="card-text"><strong>Type:</strong> {career.jobType}</p>
                  <p className="card-text">
                    <strong>Ending Date:</strong> {career.jobEndDate ? career.jobEndDate.split("T")[0] : "N/A"}
                  </p>
                  <button className="btn btn-danger btn-sm mt-2" onClick={() => handleDeleteCareer(career._id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-muted">No Career Listings Available</p>
        )}
      </div>

      {/* Career Form Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Career</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleInsertCareer}>
            <div className="mb-2">
              <label className="form-label fw-bold">Job Title</label>
              <input type="text" className="form-control" name="jobTitle" value={formState.jobTitle} onChange={handleChange} required />
            </div>

            <div className="mb-2">
              <label className="form-label fw-bold">Short Description</label>
              <input type="text" className="form-control" name="shortDescription" value={formState.shortDescription} onChange={handleChange} required />
            </div>

            <div className="mb-2">
              <label className="form-label fw-bold">Location</label>
              <input type="text" className="form-control" name="jobLocation" value={formState.jobLocation} onChange={handleChange} required />
            </div>

            <div className="mb-2">
              <label className="form-label fw-bold">Job Type</label>
              <select className="form-control" name="jobType" value={formState.jobType} onChange={handleChange} required>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div className="mb-2">
              <label className="form-label fw-bold">Job End Date</label>
              <input
                type="date"
                className="form-control"
                name="jobEndDate"
                value={formState.jobEndDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} // Prevents past dates
              />
            </div>
            <Button type="submit" className="btn btn-success w-100 mt-2">Add Career</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CareerSection;
