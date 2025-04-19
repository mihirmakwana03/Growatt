import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaDownload, FaRedo, FaPlus } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const API_URL = "http://localhost:5000/customers";

const CustomerForm = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // New Customer State
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    contact: "",
    service: "",
    datetime: "",
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [searchTerm, selectedService, startDate, endDate, customers]);

  // Handle New Customer Input
  const handleNewCustomerChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  // Add New Customer
  const handleAddCustomer = async () => {
    try {
      const response = await axios.post(API_URL, newCustomer);
      setCustomers([...customers, response.data]);
      setFilteredCustomers([...customers, response.data]);
      setShowModal(false);
      setNewCustomer({
        name: "",
        email: "",
        contact: "",
        service: "",
        datetime: "",
      });

      // Refresh the page after submission
      window.location.reload();
    } catch (error) {
      console.error("❌ Error adding customer:", error);
    }
  };

  // Fetch customer data
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = Array.isArray(response.data) ? response.data : [];
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      console.error("❌ Error fetching customers:", error);
    }
  };

  // Filter customers based on search input, service, and date range
  const filterCustomers = () => {
    let filtered = customers;
    if (searchTerm) {
      filtered = filtered.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedService) {
      filtered = filtered.filter(
        (customer) => customer.service === selectedService
      );
    }
    if (startDate && endDate) {
      filtered = filtered.filter((customer) => {
        const customerDate = new Date(customer.datetime);
        return (
          customerDate >= new Date(startDate) &&
          customerDate <= new Date(endDate)
        );
      });
    }
    setFilteredCustomers(filtered);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedService("");
    setStartDate("");
    setEndDate("");
    setFilteredCustomers(customers);
  };

  // Download Excel file
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredCustomers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "Filtered_Customers_Data.xlsx");
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 bg-gray-300 min-h-screen">
      <h2 className="text-center text-xl sm:text-2xl font-bold text-blue-600 mb-4 sm:mb-6">
        Customers List
      </h2>
      <hr className="my-2 sm:my-4 border-gray-600" />

      {/* Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Search by Name
          </label>
          <input
            type="text"
            className="border border-gray-200 bg-gray-50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 text-black text-sm"
            placeholder="Enter customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Filter by Service
          </label>
          <select
            className="border border-gray-200 bg-gray-50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 text-black text-sm"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">All Services</option>
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
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 text-sm sm:text-base">Start Date</label>
          <input
            type="date"
            className="border border-gray-200 bg-gray-50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 text-black text-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 text-sm sm:text-base">End Date</label>
          <input
            type="date"
            className="border border-gray-200 bg-gray-50 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 text-black text-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons Row */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <button
          className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded flex items-center gap-2 justify-center hover:bg-blue-700 text-sm"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Add Customer
        </button>
        <button
          className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded flex items-center gap-2 justify-center hover:bg-green-700 text-sm"
          onClick={handleDownloadExcel}
        >
          <FaDownload /> Download
        </button>
        <button
          className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded flex items-center gap-2 justify-center hover:bg-gray-700 text-sm"
          onClick={handleResetFilters}
        >
          <FaRedo /> Reset
        </button>
      </div>

      {/* Add Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black rounded-md w-[95vw] max-w-lg p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg sm:text-xl font-bold">Add New Customer</h5>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                &#x2715;
              </button>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <input
                type="text"
                className="w-full border rounded p-2 text-sm"
                name="name"
                placeholder="Name"
                value={newCustomer.name}
                onChange={handleNewCustomerChange}
              />
              <input
                type="email"
                className="w-full border rounded p-2 text-sm"
                name="email"
                placeholder="Email"
                value={newCustomer.email}
                onChange={handleNewCustomerChange}
              />
              <input
                type="text"
                className="w-full border rounded p-2 text-sm"
                name="contact"
                placeholder="Contact"
                value={newCustomer.contact}
                onChange={handleNewCustomerChange}
              />
              <select
                className="w-full border rounded p-2 text-sm"
                name="service"
                value={newCustomer.service}
                onChange={handleNewCustomerChange}
              >
                <option value="">Select Service</option>
                <option value="Logo Design">Logo Design</option>
                <option value="Brand Identity">Brand Identity</option>
                <option value="Packaging Design">Packaging Design</option>
                <option value="Business Card Design">
                  Business Card Design
                </option>
                <option value="Letterheads">Letterheads</option>
                <option value="Label Design">Label Design</option>
                <option value="Flex Design">Flex Design</option>
                <option value="Catalog Design">Catalog Design</option>
                <option value="Brochure Design">Brochure Design</option>
                <option value="Banner Design">Banner Design</option>
              </select>
              <input
                type="datetime-local"
                className="w-full border rounded p-2 text-sm"
                name="datetime"
                value={newCustomer.datetime}
                onChange={handleNewCustomerChange}
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end mt-4 sm:mt-6 gap-2 sm:gap-4">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                onClick={handleAddCustomer}
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mt-4 sm:mt-6">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div
              key={customer._id}
              className="bg-white text-black shadow rounded p-3 sm:p-4"
            >
              <h5 className="text-blue-600 text-base sm:text-lg font-bold mb-2">
                {customer.name}
              </h5>
              <p className="mb-1 text-sm">
                <span className="font-medium">Email:</span> {customer.email}
              </p>
              <p className="mb-1 text-sm">
                <span className="font-medium">Contact:</span> {customer.contact}
              </p>
              <p className="mb-1 text-sm">
                <span className="font-medium">Service:</span> {customer.service}
              </p>
              <p className="mb-3 text-sm">
                <span className="font-medium">Date & Time:</span>{" "}
                {new Date(customer.datetime).toLocaleDateString("en-GB")}{" "}
                {new Date(customer.datetime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded inline-flex items-center gap-1 hover:bg-red-700 text-sm"
                onClick={() => console.log("Delete", customer._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">
            <p className="text-gray-500">No customers found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerForm;
