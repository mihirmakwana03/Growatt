import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const AddTestimonial = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [imageUrl, setImage] = useState(null);
    const [testimonials, setTestimonials] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [filterRating, setFilterRating] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await axios.get("http://localhost:5000/testimonials");
            setTestimonials(res.data);
        } catch (error) {
            console.error("❌ Error fetching testimonials:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("message", message);
            formData.append("rating", rating);
            formData.append("image", imageUrl);

            await axios.post("http://localhost:5000/testimonials", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setName("");
            setMessage("");
            setRating(0);
            setImage(null);
            setIsModalOpen(false);
            fetchTestimonials();
        } catch (error) {
            console.error("❌ Error submitting testimonial:", error);
        }
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            alert("No testimonials selected for deletion.");
            return;
        }

        try {
            await axios.delete("http://localhost:5000/testimonials", {
                headers: { "Content-Type": "application/json" },
                data: { ids: selectedIds },
            });

            setSelectedIds([]);
            fetchTestimonials();
        } catch (error) {
            console.error("❌ Error deleting testimonials:", error);
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((selectedId) => selectedId !== id)
                : [...prevSelectedIds, id]
        );
    };

    return (
        <div className="container mx-auto px-2 sm:px-4 pt-5 min-h-screen bg-gray-50">
            <h1 className="text-center text-xl sm:text-2xl font-bold text-blue-600">Testimonials</h1>
            <hr className="my-4 border-gray-600" />
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 sm:gap-0">
                <button
                    className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Testimonial
                </button>
                <div className="flex items-center w-full sm:w-auto justify-end">
                    <label className="mr-2 text-gray-900 whitespace-nowrap">Filter by Rating:</label>
                    <select
                        className="border border-gray-300 rounded px-2 py-1 text-gray-900 bg-white"
                        onChange={(e) => setFilterRating(Number(e.target.value))}
                    >
                        <option value="0">All</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num} Stars
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Delete Selected Button */}
            {selectedIds.length > 0 && (
                <div className="text-right mb-4">
                    <button
                        className="w-full sm:w-auto bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200"
                        onClick={handleDelete}
                    >
                        Delete Selected ({selectedIds.length})
                    </button>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-200 bg-opacity-75 flex justify-center items-center text-gray-900 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-[95vw] max-w-md mx-2">
                        <h3 className="text-lg font-bold mb-4">Add Testimonial</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block font-medium mb-1 text-gray-900">Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-1 text-gray-900">Message</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900"
                                    rows="3"
                                    placeholder="Your testimonial..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4 text-center">
                                <label className="block font-medium mb-2 text-gray-900">Rate Us</label>
                                <div className="flex justify-center">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            size={24}
                                            onClick={() => setRating(index + 1)}
                                            onMouseEnter={() => setHover(index + 1)}
                                            onMouseLeave={() => setHover(null)}
                                            color={index + 1 <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                            className="cursor-pointer mx-1"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end gap-2">
                                <button
                                    type="submit"
                                    className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-100 text-gray-900 px-4 py-2 rounded hover:bg-gray-200"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials
                    .filter((t) => filterRating === 0 || t.rating === filterRating)
                    .map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className={`border ${selectedIds.includes(testimonial._id) ? "border-red-300" : "border-gray-200"} rounded-lg p-4 shadow bg-white flex flex-col`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h6 className="font-bold text-gray-900 text-base sm:text-lg">{testimonial.name}</h6>
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-blue-600"
                                    checked={selectedIds.includes(testimonial._id)}
                                    onChange={() => toggleSelect(testimonial._id)}
                                />
                            </div>
                            <p className="text-sm text-gray-700 mb-2 break-words">{testimonial.message}</p>
                            <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                    <FaStar
                                        key={index}
                                        size={16}
                                        color={index < testimonial.rating ? "#ffc107" : "#e4e5e9"}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AddTestimonial;
