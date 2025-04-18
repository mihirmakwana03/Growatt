import React, { useState, useEffect } from "react";

const ContactManager = () => {
  const [contactInfo, setContactInfo] = useState([]);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    businessHours: "",
  });

  // Fetch contact info on component mount
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const res = await fetch("http://localhost:5000/contact/info");
      const data = await res.json();
      setContactInfo(data);
    } catch (error) {
      console.error("❌ Failed to fetch contact info:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/contact/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          title: "",
          email: "",
          address: "",
          businessHours: "",
        });
        fetchContactInfo(); // Refresh list
      } else {
        throw new Error("Failed to insert contact info");
      }
    } catch (error) {
      console.error("❌ Failed to insert data:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-black shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Contact Manager
      </h2>

      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Contact Info
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add Contact Info</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="Icon"
                placeholder="Icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.Title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="content"
                placeholder="Content"
                value={formData.content}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="link"
                placeholder="Link tel: or mailto:"
                value={formData.link}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={`mt-10 ${isModalOpen ? "blur-sm" : ""}`}>
        <hr className="my-3" />
        {contactInfo.length > 0 ? (
          contactInfo.map((info, index) => (
            <div key={index} className="border-b py-4">
              <p>
                <strong>Icon: </strong> {info.icon}
              </p>
              <p>
                <strong>Title: </strong> {info.title}
              </p>
              <p>
                <strong>Content: </strong> {info.content}
              </p>
              <p>
                <strong>Link: </strong> {info.link}
              </p>
            </div>
          ))
        ) : (
          <p>No contact information available.</p>
        )}
      </div>
    </div>
  );
};

export default ContactManager;
