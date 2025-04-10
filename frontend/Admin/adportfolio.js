import React, { useState, useEffect } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Portfolio = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Store ID of item to be deleted

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get(`${API_URL}/portfolio?timestamp=${new Date().getTime()}`);
      setData(response.data);
    } catch (error) {
      console.error("❌ Fetch error:", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file);

    try {
      await axios.post(`${API_URL}/portfolio`, formData);
      fetchPortfolio();
      resetForm();
      setShowForm(false);
      alert("✅ Portfolio item uploaded successfully!");
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Failed to upload item.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    const deleteModal = new window.bootstrap.Modal(document.getElementById("deleteModal"));
    deleteModal.show();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${API_URL}/portfolio/${deleteId}`);
      window.location.reload();
      fetchPortfolio();
    } catch (error) {
      console.error("❌ Delete error:", error);
      alert("Failed to delete item.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold text-primary">Portfolio</h2>

      {/* ✅ Initially Show Upload Button Only */}
      {!showForm && (
        <div className="text-center mb-3">
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>Upload Portfolio Item</button>
          <hr />
        </div>
      )}

      {/* ✅ Upload Form (Hidden Initially) */}
      {showForm && (
        <div className="card p-4 shadow-sm bg-light mb-4">
          <h4 className="text-center mb-3">Upload Portfolio Item</h4>
          <form onSubmit={handleUpload}>
            <div className="mb-3">
              <label className="form-label fw-bold">Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Description</label>
              <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Upload Image</label>
              <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">Upload</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* ✅ Portfolio Display */}
      <div className="row">
        {data.length > 0 ? (
          data.map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <div className="card shadow-sm">
                <img src={`${API_URL}${item.imageUrl}`} className="card-img-top" alt={item.title} crossorigin="anonymous" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(item._id)} data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No Portfolio Items Available</p>
        )}
      </div>

      {/* ✅ Delete Confirmation Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger">Confirm Deletion</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete} data-bs-dismiss="modal">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
