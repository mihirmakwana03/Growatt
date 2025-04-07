import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000/careers"; // ✅ API Endpoint

const CareerSection = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [formState, setFormState] = useState({
    jobTitle: "",
    shortDescription: "",
    jobDescription: "",
    jobRequirements: "",
    jobLocation: "",
    jobType: "full-time",
    jobEndDate: "", // ✅ Added Job Ending Date
  });

  // Fetch Careers
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await axios.get(API_URL);
        setCareers(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch careers. Please try again later.");
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

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
        jobDescription: "",
        jobRequirements: "",
        jobLocation: "",
        jobType: "full-time",
        jobEndDate: "",
      });
    } catch (error) {
      setError("Failed to add career. Please try again.");
    }
  };

  // Delete Career
  const handleDeleteCareer = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCareers(careers.filter((career) => career._id !== id));
    } catch (error) {
      setError("Failed to delete career. Please try again.");
    }
  };

  {/* Career Details Modal */ }
  {
    selectedCareer && (
      <div className="position-fixed top-50 start-50 translate-middle bg-white shadow rounded p-3"
        style={{ width: "350px", zIndex: 1050 }}>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
          <h5 className="text-primary fw-bold">{selectedCareer.jobTitle}</h5>
          <button className="btn-close" onClick={() => setSelectedCareer(null)}></button>
        </div>
        <div className="mt-2">
          <p className="mb-1"><strong>Description:</strong> {selectedCareer.jobDescription}</p>
          <p className="mb-1"><strong>Requirements:</strong> {selectedCareer.jobRequirements}</p>
          <p className="mb-1"><strong>Location:</strong> {selectedCareer.jobLocation}</p>
          <p className="mb-1"><strong>Type:</strong>
            <span className="badge bg-success ms-2">{selectedCareer.jobType}</span>
          </p>
          <p className="mb-1"><strong>Ending Date:</strong> {selectedCareer.jobEndDate ? new Date(selectedCareer.jobEndDate).toLocaleDateString("en-US") : "N/A"}</p>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-danger px-3" onClick={() => setSelectedCareer(null)}>Close</button>
        </div>
      </div>
    )
  };

  useEffect(() => {
    if (selectedCareer) {
      console.log("Modal should be showing:", selectedCareer);
    }
  }, [selectedCareer]);


  return (
    <div className="container mt-4">
      <h1 className="text-left mb-4 fw-bolder" style={{ color: "#f2912a", textDecoration: "underline double" }}>
        Career Opportunities
      </h1>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Insert Career Button */}
      <button className="btn btn-primary w-100 mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Insert Career"}
      </button>

      {/* Loading State */}
      {loading && <p className="text-center text-muted">Loading careers...</p>}

      {/* Careers List */}
      <div className="row">
        {careers.length > 0 ? (
          careers.map((career) => (
            <div className="col-12 col-sm-6 col-md-4 mb-3" key={career._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <p className="card-text"><strong>Job Title:</strong> {career.jobTitle}</p>
                  <p className="card-text"><strong>Location:</strong> {career.jobLocation}</p>
                  <p className="card-text"><strong>Type:</strong> {career.jobType}</p>
                  <p className="card-text"><strong>Ending Date: </strong>
                    {career.jobEndDate ? new Date(career.jobEndDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) : "N/A"}
                  </p>
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => {
                        console.log("Career selected:", career); // ✅ Debugging log
                        setSelectedCareer(career);
                      }}
                    >
                      View Details
                    </button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteCareer(career._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-muted">No Career Listings Available</p>
        )}
      </div>

      {/* Insert Career Form */}
      {showForm && (
        <form className="shadow p-3 rounded bg-light w-100" onSubmit={handleInsertCareer}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Job Title" name="jobTitle" value={formState.jobTitle} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <textarea className="form-control" rows="2" placeholder="Short Description" name="shortDescription" value={formState.shortDescription} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3">
            <textarea className="form-control" rows="3" placeholder="Job Description" name="jobDescription" value={formState.jobDescription} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3">
            <textarea className="form-control" rows="2" placeholder="Job Requirements" name="jobRequirements" value={formState.jobRequirements} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Job Location" name="jobLocation" value={formState.jobLocation} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Job Ending Date</label>
            <input type="date" className="form-control" name="jobEndDate" value={formState.jobEndDate} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <select className="form-select" name="jobType" value={formState.jobType} onChange={handleChange} required>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CareerSection;
