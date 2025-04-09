import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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

    if (loading) return <p className="text-center mt-3">Loading...</p>;
    if (error) return <p className="text-center text-danger mt-3">{error}</p>;

    return (
        <div className="container mt-1">
            <h2 className="text-primary">Job Applications</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr align="center">
                            <th>Applicant Name</th>
                            <th>Job Title</th>
                            <th>Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((app, index) => (
                                <tr key={app._id}>
                                    <td><b>{app.name}</b></td>
                                    <td>{app.jobTitle}</td>
                                    <td>
                                        <a href={app.resume} target="_blank" rel="noopener noreferrer">
                                            View Resume
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No applications found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationsList;
