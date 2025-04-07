import React, { useEffect, useState } from "react";

function AdInquiry() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    // Fetch all contacts
    const fetchContacts = () => {
        fetch("http://localhost:5000/contact/inquiry")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setContacts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching contacts:", error);
                setLoading(false);
            });
    };

    // Open delete confirmation modal
    const openDeleteModal = (id) => {
        setSelectedContact(id);
        const deleteModal = new window.bootstrap.Modal(document.getElementById("deleteModal"));
        deleteModal.show();
    };

    // Delete a contact by ID
    const handleDelete = async () => {
        if (!selectedContact) return;

        try {
            const response = await fetch(`http://localhost:5000/contact/delete/${selectedContact}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete contact");
            }

            // Remove deleted contact from state
            setContacts(contacts.filter((contact) => contact._id !== selectedContact));
            setSelectedContact(null);

            // Hide modal after deletion
            const deleteModal = window.bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
            deleteModal.hide();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center fw-bold text-warning">Contact Submissions</h1>
            <hr />
            {loading ? (
                <p>Loading contacts...</p>
            ) : contacts.length > 0 ? (
                <table className="table table-bordered mt-4">
                    <thead className="table-dark">
                        <tr align="center">
                            <th>Sr. No.</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr align="center" key={contact._id}>
                                <td>{index + 1}</td>
                                <td>{contact.fullName}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>{contact.message}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => openDeleteModal(contact._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No contact submissions found.</p>
            )}

            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger">Confirm Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this contact? This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdInquiry;
