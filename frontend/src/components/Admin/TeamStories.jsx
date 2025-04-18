import React, { useState, useEffect } from "react";

const TeamStories = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", designation: "", message: "", image: null });
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/teamstories")
            .then((res) => res.json())
            .then((data) => {
                setTeamMembers(data);
                setFilteredMembers(data);
            })
            .catch((error) => console.error("Error fetching team members:", error));
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("designation", formData.designation);
        formDataObj.append("message", formData.message);
        formDataObj.append("image", formData.image);

        const response = await fetch("http://localhost:5000/teamstories/add", {
            method: "POST",
            body: formDataObj,
        });

        if (response.ok) {
            alert("Team member added!");
            setShowModal(false);
            setFormData({ name: "", designation: "", message: "", image: null });
            const updated = await fetch("http://localhost:5000/teamstories").then(res => res.json());
            setTeamMembers(updated);
            setFilteredMembers(updated);
        } else {
            alert("Failed to add team member.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            const response = await fetch(`http://localhost:5000/teamstories/delete/${id}`, { method: "DELETE" });

            if (response.ok) {
                alert("Member deleted!");
                setTeamMembers(teamMembers.filter((m) => m._id !== id));
                setFilteredMembers(filteredMembers.filter((m) => m._id !== id));
            } else {
                alert("Failed to delete member.");
            }
        }
    };

    const handleFilterChange = (e) => {
        const selected = e.target.value;
        setFilter(selected);
        setFilteredMembers(selected ? teamMembers.filter((m) => m.designation === selected) : teamMembers);
    };

    return (
        <div className="container mx-auto px-4 pt-5 min-h-screen bg-gray-300">
        <h1 className="text-center text-2xl font-bold text-blue-600">Team Stories</h1>
        <hr className="my-4 border-gray-600" />

            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => setShowModal(true)}>+ Add Story</button>
                <select className="mt-4 md:mt-0 border border-gray-300 rounded px-3 py-2 bg-white text-black" value={filter} onChange={handleFilterChange}>
                    <option value="">All Designations</option>
                    {Array.from(new Set(teamMembers.map((m) => m.designation))).map((d, i) => (
                        <option key={i} value={d}>{d}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                    <div key={member._id} className="bg-white shadow rounded p-4 text-center">
                        <img src={`http://localhost:5000/storyImg/${member.image}`} alt={member.name} className="w-24 h-24 rounded-full mx-auto object-cover" crossOrigin="anonymous" />
                        <h5 className="mt-4 font-bold text-lg text-black">{member.name}</h5>
                        <h5 className="mt-1 text-sm text-gray-700">{member.message}</h5>
                        <p className="text-gray-500 mt-1">{member.designation}</p>
                        <button className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(member._id)}>Delete</button>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md text-black">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h5 className="text-lg font-bold">Add Story</h5>
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <div className="p-4">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 bg-white" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Designation</label>
                                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 bg-white" name="designation" value={formData.designation} onChange={handleChange} required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Message</label>
                                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 bg-white" name="message" value={formData.message} onChange={handleChange} required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Image</label>
                                    <input type="file" className="w-full border border-gray-300 rounded px-3 py-2" name="image" accept="image/*" onChange={handleChange} required />
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Story</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamStories;