import React, { useEffect, useState } from "react";

function AdInquiry() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                // Sort contacts so the latest message appears on top
                const sortedContacts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setContacts(sortedContacts);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching contacts:", error);
                setLoading(false);
            });
    };

    return (
        <div className="container mt-1">
            <h2 className="text-primary">Inquiry List</h2>
            {/* ✅ Contact Table */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr align="center">
                            <th>Name</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact._id}>
                                <td><b>{contact.fullName}</b></td>
                                <td>{contact.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* ✅ Loading Spinner */}
                {loading && (
                    <div className="text-center mt-3">
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                )}

                {/* ✅ No Data Found */}
                {!loading && contacts.length === 0 && (
                    <p className="text-muted text-center">No contact submissions found.</p>
                )}

            </div>
        </div>
    );
}

export default AdInquiry;