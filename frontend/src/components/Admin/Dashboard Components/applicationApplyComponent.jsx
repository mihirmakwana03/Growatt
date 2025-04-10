import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicationsList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get("http://localhost:5000/applications");
                console.log("✅ Fetched applications:", response.data);

                // Sort applications by createdAt date (latest first)
                const sortedApplications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setApplications(sortedApplications);
            } catch (err) {
                console.error("❌ API Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) return <p className="text-center mt-3 text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-3">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Job Applications</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2 text-center">Applicant Name</th>
                            <th className="px-4 py-2 text-center">Job Title</th>
                            <th className="px-4 py-2 text-center">Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((app) => (
                                <tr key={app._id} className="border-b border-gray-300">
                                    <td className="px-4 py-2 text-center font-medium text-black">{app.name}</td>
                                    <td className="px-4 py-2 text-center text-black">{app.jobTitle}</td>
                                    <td className="px-4 py-2 text-center">
                                        <a
                                            href={app.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            View Resume
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                                    No applications found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationsList;
