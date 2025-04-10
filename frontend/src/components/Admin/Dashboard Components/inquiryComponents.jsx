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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Inquiry List</h2>
            {/* ✅ Contact Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-800 text-white text-center">
                            <th className="px-4 py-2 border border-gray-300">Name</th>
                            <th className="px-4 py-2 border border-gray-300">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact._id} className="text-center odd:bg-gray-100 even:bg-white text-black">
                                <td className="px-4 py-2 border border-gray-300 font-semibold text-black">{contact.fullName}</td>
                                <td className="px-4 py-2 border border-gray-300">{contact.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* ✅ Loading Spinner */}
                {loading && (
                    <div className="flex justify-center mt-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {/* ✅ No Data Found */}
                {!loading && contacts.length === 0 && (
                    <p className="text-gray-500 text-center mt-4">No contact submissions found.</p>
                )}
            </div>
        </div>
    );
}

export default AdInquiry;
