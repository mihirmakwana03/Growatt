import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TeamMembers = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", designation: "", image: null });
    const [filter, setFilter] = useState("");

    // Fetch team members
    useEffect(() => {
        fetch("http://localhost:5000/team")
            .then((res) => res.json())
            .then((data) => {
                setTeamMembers(data);
                setFilteredMembers(data);
            })
            .catch((error) => console.error("Error fetching team members:", error));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("designation", formData.designation);
        formDataObj.append("image", formData.image);

        const response = await fetch("http://localhost:5000/team/add", {
            method: "POST",
            body: formDataObj,
        });

        if (response.ok) {
            alert("Team member added!");
            setShowModal(false);
            setFormData({ name: "", designation: "", image: null });

            // Refresh team members list
            fetch("http://localhost:5000/team")
                .then((res) => res.json())
                .then((data) => {
                    setTeamMembers(data);
                    setFilteredMembers(data);
                });
        } else {
            alert("Failed to add team member.");
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            const response = await fetch(`http://localhost:5000/team/delete/${id}`, { method: "DELETE" });

            if (response.ok) {
                alert("Member deleted!");
                setTeamMembers(teamMembers.filter((member) => member._id !== id));
                setFilteredMembers(filteredMembers.filter((member) => member._id !== id));
            } else {
                alert("Failed to delete member.");
            }
        }
    };

    // Handle Filter
    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);
        if (selectedFilter) {
            setFilteredMembers(teamMembers.filter((member) => member.designation === selectedFilter));
        } else {
            setFilteredMembers(teamMembers);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary mb-4 fw-bold">Our Team</h2>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-success" onClick={() => setShowModal(true)}>+ Add Member</button>
                <select className="form-select w-auto" value={filter} onChange={handleFilterChange}>
                    <option value="">All Designations</option>
                    {Array.from(new Set(teamMembers.map(member => member.designation))).map((designation, index) => (
                        <option key={index} value={designation}>{designation}</option>
                    ))}
                </select>
            </div>

            <div className="row">
                {filteredMembers.map((member) => (
                    <div key={member._id} className="col-md-4 text-center mb-4">
                        <div className="card shadow border-0 p-3">
                            <img
                                src={`http://localhost:5000/membersImg/${member.image}`}
                                alt={member.name}
                                className="rounded-circle mx-auto d-block"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                crossOrigin="anonymous"
                            />
                            <h5 className="mt-3 fw-bold">{member.name}</h5>
                            <p className="text-muted">{member.designation}</p>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(member._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Team Member</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Designation</label>
                                        <input type="text" className="form-control" name="designation" value={formData.designation} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Image</label>
                                        <input type="file" className="form-control" name="image" accept="image/*" onChange={handleChange} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Add Member</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default TeamMembers;
