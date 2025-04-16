import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserPlus, FaTrash } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/customersform";

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
      await axios.delete(`${API_URL}/${id}`);
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
    <div className="container mx-auto p-4">
      {/* Floating Button */}
      <button
        className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
        onClick={() => setShowModal(true)}
      >
        <FaUserPlus />
      </button>

      {/* Modal for Customer Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-blue-600">Add Customer</h4>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
            </div>
            {successMessage && (
              <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Customer Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <small className="text-red-500">{errors.name}</small>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Email ID</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <small className="text-red-500">{errors.email}</small>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Contact No</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                  {errors.contact && (
                    <small className="text-red-500">{errors.contact}</small>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Select Service</label>
                  <select
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
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
                  {errors.service && (
                    <small className="text-red-500">{errors.service}</small>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">Select Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                    name="datetime"
                    value={formData.datetime}
                    onChange={handleChange}
                    required
                  />
                  {errors.datetime && (
                    <small className="text-red-500">{errors.datetime}</small>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  ✅ Add Details
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <input
          type="text"
          className="w-full md:w-1/2 border border-gray-300 rounded p-2"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="w-full md:w-1/3 border border-gray-300 rounded p-2"
          onChange={handleServiceFilterChange}
        >
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

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div
              className="bg-white shadow rounded p-4 border border-gray-200"
              key={customer._id}
            >
              <h5 className="text-lg font-bold text-blue-600">{customer.name}</h5>
              <p className="text-sm">
                <strong>Email:</strong> {customer.email}
              </p>
              <p className="text-sm">
                <strong>Contact:</strong> {customer.contact}
              </p>
              <p className="text-sm">
                <strong>Service:</strong> {customer.service}
              </p>
              <p className="text-sm">
                <strong>Date & Time:</strong>{" "}
                {new Date(customer.datetime).toLocaleDateString("en-GB")}{" "}
                {new Date(customer.datetime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600"
                onClick={() => deleteCustomer(customer._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-gray-500">No customers found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerForm;
