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
        document.getElementById("deleteModal").classList.remove("hidden");
    };

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        setSelectedContact(null);
        document.getElementById("deleteModal").classList.add("hidden");
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
            closeDeleteModal();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 pt-5 min-h-screen bg-gray-300">
            <h1 className="text-center text-2xl font-bold text-blue-600">Contact Submissions</h1>
            <hr className="my-4 border-gray-600" />

            {/* ✅ Loading Spinner */}
            {loading && (
                <div className="text-center mt-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {/* ✅ No Data Found */}
            {!loading && contacts.length === 0 && (
                <p className="text-gray-500 text-center">No contact submissions found.</p>
            )}

            {/* ✅ Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map((contact) => (
                    <div
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200 text-black"
                        key={contact._id}
                    >
                        <h5 className="text-lg font-bold text-blue-600">{contact.fullName}</h5>
                        <p className="text-sm">
                            <strong>Email:</strong> {contact.email}
                        </p>
                        <p className="text-sm">
                            <strong>Phone:</strong> +{contact.phone}
                        </p>
                        <p className="text-sm">
                            <strong>Message:</strong> {contact.message}
                        </p>

                        <div className="flex justify-between mt-4">
                            {/* ✅ Reply Email Button */}
                            <a
                                href={`mailto:${contact.email}`}
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                            >
                                Reply Email
                            </a>

                            {/* ✅ Delete Button */}
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                onClick={() => openDeleteModal(contact._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ Delete Confirmation Modal */}
            <div
                id="deleteModal"
                className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96">
                    <h5 className="text-lg font-bold text-red-600">Confirm Deletion</h5>
                    <p className="text-sm text-gray-600 mt-2">
                        Are you sure you want to delete this contact? This action cannot be undone.
                    </p>
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                            onClick={closeDeleteModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdInquiry;
