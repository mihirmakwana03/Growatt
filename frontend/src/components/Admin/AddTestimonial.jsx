import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import "./testimonal.css";

const AddTestimonial = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [testimonials, setTestimonials] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [filterRating, setFilterRating] = useState(0);

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
            await axios.post("http://localhost:5000/testimonials", { name, message, rating });
            setName("");
            setMessage("");
            setRating(0);
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
                headers: { "Content-Type": "application/json" }, // ✅ Ensure JSON format
                data: { ids: selectedIds }, // ✅ Send data inside 'data'
            });

            setSelectedIds([]);
            fetchTestimonials(); // Refresh list after deletion
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
        <div className="container mt-4">
            {/* ✅ Button Group */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#testimonialModal">
                    Add Testimonial
                </button>
                <div className="d-flex align-items-center">
                    <label className="me-2">Filter by Rating:</label>
                    <select className="form-select w-auto" onChange={(e) => setFilterRating(Number(e.target.value))}>
                        <option value="0">All</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num} Stars</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ✅ Delete Selected Button */}
            {selectedIds.length > 0 && (
                <div className="text-end mb-3">
                    <button className="btn btn-danger" onClick={handleDelete}>Delete Selected ({selectedIds.length})</button>
                </div>
            )}

            {/* ✅ Bootstrap Modal for Upload Form */}
            <div className="modal fade" id="testimonialModal" tabIndex="-1" aria-labelledby="testimonialModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-primary">Add Testimonial</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <label className="form-label fw-bold small">Name</label>
                                    <input type="text" className="form-control" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label fw-bold small">Message</label>
                                    <textarea className="form-control" rows="2" placeholder="Your testimonial..." value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                                </div>
                                <div className="mb-2 text-center">
                                    <label className="form-label d-block small">Rate Us</label>
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar key={index} size={20} onClick={() => setRating(index + 1)} onMouseEnter={() => setHover(index + 1)} onMouseLeave={() => setHover(null)} color={index + 1 <= (hover || rating) ? "#ffc107" : "#e4e5e9"} className="mx-1 cursor-pointer" />
                                    ))}
                                </div>
                                <div className="d-flex justify-content-end mt-2">
                                    <button type="submit" className="btn btn-success me-2">Submit</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Display Testimonials in a Grid */}
            <div className="row">
                {testimonials.filter(t => filterRating === 0 || t.rating === filterRating).map((testimonial) => (
                    <div key={testimonial._id} className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <div className={`card p-2 shadow-sm ${selectedIds.includes(testimonial._id) ? "border border-danger" : ""}`}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h6 className="mb-0">{testimonial.name}</h6>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={selectedIds.includes(testimonial._id)}
                                    onChange={() => toggleSelect(testimonial._id)}
                                />
                            </div>
                            <p className="small mb-1">{testimonial.message}</p>
                            <div>
                                {[...Array(5)].map((_, index) => (
                                    <FaStar key={index} size={16} color={index < testimonial.rating ? "#ffc107" : "#e4e5e9"} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddTestimonial;
