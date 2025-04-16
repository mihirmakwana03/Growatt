import React, { useState } from "react";
import { MdAttachMoney } from "react-icons/md";

const PricingListForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowForm(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    fetch("/pricing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data successfully submitted:", data);
        setShowForm(false); // Close modal on success
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });

    setFormData({ name: "", price: "", description: "" });
  };

return (
    <div className="container mx-auto p-4">
          <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">Services Pricing & Details</h2>
    
          <div className="text-center mb-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
              onClick={() => setShowForm(true)}
            >
              <MdAttachMoney className="inline mr-1" />Add Pricing
            </button>
          </div>

        {showForm && (
            <div
                className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center z-50"
                onClick={handleOverlayClick}
            >
                <div className="bg-gray-900 p-8 rounded-lg max-w-lg w-11/12 relative shadow-lg">
                    <button
                        onClick={() => setShowForm(false)}
                        className="absolute top-2.5 right-4 text-2xl text-gray-400 bg-none border-none cursor-pointer"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        <div className="flex flex-col">
                            <label
                                htmlFor="name"
                                className="mb-1.5 text-lg text-gray-400"
                            >
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="p-2.5 text-base rounded-md border border-gray-700 bg-gray-800 text-white"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                                <label
                                    htmlFor="type"
                                    className="mb-1.5 text-lg text-gray-400"
                                >
                                    Category:
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type || ""}
                                    onChange={handleChange}
                                    className="p-2.5 text-base rounded-md border border-gray-700 bg-gray-800 text-white"
                                    required
                                >
                                    <option value="" disabled>Select type</option>
                                    <option value="service">Service</option>
                                    <option value="product">Product</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="pricingDetail"
                                    className="mb-1.5 text-lg text-gray-400"
                                >
                                    Pricing Detail:
                                </label>
                                <select
                                    id="pricingDetail"
                                    name="pricingDetail"
                                    value={formData.pricingDetail || ""}
                                    onChange={handleChange}
                                    className="p-2.5 text-base rounded-md border border-gray-700 bg-gray-800 text-white"
                                    required
                                >
                                    <option value="" disabled>Select pricing detail</option>
                                    <option value="basic">Basic</option>
                                    <option value="advance">Advance</option>
                                    <option value="premium">Premium</option>
                                </select>
                            </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="price"
                                className="mb-1.5 text-lg text-gray-400"
                            >
                                Price:
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="p-2.5 text-base rounded-md border border-gray-700 bg-gray-800 text-white"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="description"
                                className="mb-1.5 text-lg text-gray-400"
                            >
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="p-2.5 text-base rounded-md border border-gray-700 bg-gray-800 text-white resize-y"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="features"
                                className="mb-1.5 text-lg text-gray-400"
                            >
                                Features:
                            </label>
                            <textarea
                                id="features"
                                name="features"
                                value={formData.features || ""}
                                onChange={handleChange}
                                className="p-2.5 text-base rounded-md border border-gray-700 bg-gray-800 text-white resize-y"
                                placeholder="Enter features, each on a new line"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="py-3 px-5 text-lg text-white bg-blue-600 border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-blue-800"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )}
    </div>
);
};

export default PricingListForm;
