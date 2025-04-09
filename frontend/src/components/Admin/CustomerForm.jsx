import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserPlus, FaTrash } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    service: "",
    datetime: "",
  });

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [searchTerm, selectedService, customers]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      // Adjust here: if the API returns an object with a "customers" property, extract it.
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.customers || [];
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      console.error("❌ Error fetching customers:", error);
    }
  };
  

  const deleteCustomer = async (id) => {
    try {
      console.log("Deleting customer with ID:", id); // Debugging
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log("Delete Response:", response.data);
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error("❌ Error deleting customer:", error.response?.data || error);
    }
  };

  const filterCustomers = () => {
    let filtered = customers;
    if (searchTerm) {
      filtered = filtered.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedService) {
      filtered = filtered.filter((customer) => customer.service === selectedService);
    }
    setFilteredCustomers(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleServiceFilterChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(API_URL, formData, {
          headers: { "Content-Type": "application/json" },
        });
        setSuccessMessage(response.data.message);
        handleReset();
        setShowModal(false);
        fetchCustomers();
      } catch (error) {
        console.error("❌ Error submitting form:", error);
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Customer name is required!";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Invalid email format!";
    if (!formData.contact.match(/^\d{10}$/)) errors.contact = "Contact number must be 10 digits!";
    if (!formData.service) errors.service = "Please select a service!";
    if (!formData.datetime) errors.datetime = "Please select date & time!";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      contact: "",
      service: "",
      datetime: "",
    });
    setErrors({});
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      {/* Floating Button */}
      <button className="btn btn-success floating-btn" onClick={() => setShowModal(true)}>
        <FaUserPlus />
      </button>

      {/* Modal for Customer Form */}
      <div className={`modal fade ${showModal ? "show d-block" : ""}`} id="customerModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-primary">Add Customer</h4>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-7">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Customer Name</label>
                      <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                      {errors.name && <small className="text-danger">{errors.name}</small>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Email ID</label>
                      <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Contact No</label>
                      <input type="tel" className="form-control" name="contact" value={formData.contact} onChange={handleChange} required />
                      {errors.contact && <small className="text-danger">{errors.contact}</small>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Select Service</label>
                      <select className="form-select" name="service" value={formData.service} onChange={handleChange} required>
                        <option value="">Choose a service</option>
                        <option value="Logo Design">Logo Design</option>
                        <option value="Brand Identity">Brand Identity</option>
                        <option value="Packaging Design">Packaging Design</option>
                        <option value="Business Card Design">Business Card Design</option>
                        <option value="Letterheads">Letterheads</option>
                        <option value="Label Design">Label Design</option>
                        <option value="Flex Design">Flex Design</option>
                        <option value="Catalog Design">Catalog Design</option>
                        <option value="Brochure Design">Brochure Design</option>
                        <option value="Banner Design">Banner Design</option>
                      </select>
                      {errors.service && <small className="text-danger">{errors.service}</small>}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Select Date & Time</label>
                      <input type="datetime-local" className="form-control" name="datetime" value={formData.datetime} onChange={handleChange} required />
                      {errors.datetime && <small className="text-danger">{errors.datetime}</small>}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button type="submit" className="btn btn-success me-2">✅ Add Details</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="row mt-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" onChange={handleServiceFilterChange}>
            <option value="">All Service</option>
            <option value="Logo Design">Logo Design</option>
            <option value="Brand Identity">Brand Identity</option>
            <option value="Packaging Design">Packaging Design</option>
            <option value="Business Card Design">Business Card Design</option>
            <option value="Letterheads">Letterheads</option>
            <option value="Label Design">Label Design</option>
            <option value="Flex Design">Flex Design</option>
            <option value="Catalog Design">Catalog Design</option>
            <option value="Brochure Design">Brochure Design</option>
            <option value="Banner Design">Banner Design</option>
          </select>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="row mt-4">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div className="col-md-4 mb-4" key={customer._id}>
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">{customer.name}</h5>
                  <p className="card-text"><strong>Email:</strong> {customer.email}</p>
                  <p className="card-text"><strong>Contact:</strong> {customer.contact}</p>
                  <p className="card-text"><strong>Service:</strong> {customer.service}</p>
                  <p className="card-text">
                    <strong>Date & Time:</strong> {new Date(customer.datetime).toLocaleDateString("en-GB")}{" "}
                    {new Date(customer.datetime).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                  <button className="btn btn-danger btn-sm mt-2" onClick={() => deleteCustomer(customer._id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">No customers found.</p>
          </div>
        )}
      </div>

      {/* Floating Button CSS */}
      <style>
        {`
          .floating-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            border-radius: 50px;
            padding: 15px 20px;
            font-size: 18px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
};

export default CustomerForm;
