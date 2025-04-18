import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload, FaTrash, FaFileImage } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Portfolio = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/portfolio?timestamp=${new Date().getTime()}`
      );
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
    formData.append("type", type);

    try {
      await axios.post(`${API_URL}/portfolio`, formData);
      fetchPortfolio();
      setTitle("");
      setDescription("");
      setType("");
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Failed to upload item.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${API_URL}/portfolio/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error("❌ Delete error:", error);
      alert("Failed to delete item.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div className="container mx-auto px-4 pt-5 min-h-screen bg-gray-300">
      <h1 className="text-center text-2xl font-bold text-blue-600">
        Portfolio
      </h1>
      <hr className="my-4 border-gray-600" />

      {/* Add Portfolio Button */}
      <div className="text-center mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
          onClick={() => document.getElementById("uploadModal").showModal()}
        >
          <FaUpload className="inline mr-2" /> Add Portfolio Item
        </button>
      </div>

      {/* Portfolio Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-md overflow-hidden relative"
            >
              <img
                src={`${API_URL}${item.imageUrl}`}
                alt={item.title}
                className="w-full h-40 object-cover"
                crossOrigin="anonymous"
              />
              <div className="p-4">
                <h6 className="font-bold text-lg text-black truncate">
                  {item.title}
                </h6>
                <p className="text-sm text-gray-600 truncate">
                  Category: <span className="text-blue-600">{item.type}</span>
                </p>
              </div>
              <button
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700"
                onClick={() => handleDelete(item._id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No Portfolio Items Available
          </p>
        )}
      </div>

      {/* Upload Modal */}
      <dialog
        id="uploadModal"
        className="rounded-md shadow-lg w-full max-w-lg p-6 bg-white text-black"
      >
        <h4 className="text-xl font-bold text-blue-600 mb-4">
          Upload Portfolio Item
        </h4>
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label className="block font-bold mb-2">Title</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 bg-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Description</label>
            <textarea
              className="w-full border rounded-md p-2 bg-white"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Category</label>
            <select
              className="w-full border rounded-md p-2 bg-white"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="Logo Design">🎨 Logo Design</option>
              <option value="Brand Identity">🆔 Brand Identity</option>
              <option value="Packaging Design">📦 Packaging Design</option>
              <option value="Business Card Design">
                💼 Business Card Design
              </option>
              <option value="Letterheads">✍ Letterheads</option>
              <option value="Label Design">🏷 Label Design</option>
              <option value="Flex Design">📐 Flex Design</option>
              <option value="Catalog Design">📖 Catalog Design</option>
              <option value="Brochure Design">📰 Brochure Design</option>
              <option value="Banner Design">🖼 Banner Design</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Upload Image</label>
            <div className="border rounded-md p-4 flex flex-col items-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-40 object-cover mb-2"
                />
              ) : (
                <FaFileImage size={50} className="text-gray-400 mb-2" />
              )}
              <input
                type="file"
                className="w-full"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700"
            >
              <FaUpload className="inline mr-2" /> Upload
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-md shadow hover:bg-gray-500"
              onClick={() => document.getElementById("uploadModal").close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Portfolio;
