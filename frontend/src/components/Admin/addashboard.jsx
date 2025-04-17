import React, { useEffect, useState } from "react";
import axios from "axios";
import ApplicationsList from "./Dashboard Components/applicationApplyComponent";
import InquiryList from "./Dashboard Components/inquiryComponents";

const AdDashboard = () => {
    const [stats, setStats] = useState({ total: 0, active: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobStats = async () => {
            try {
                const response = await axios.get("http://localhost:5000/careers");
                console.log("✅ Fetched jobs:", response.data);

                const jobs = response.data;
                const totalJobs = jobs.length;
                const activeJobs = jobs.filter(job => new Date(job.jobEndDate) >= new Date()).length;

                setStats({ total: totalJobs, active: activeJobs });
            } catch (err) {
                console.error("❌ API Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobStats();
    }, []);

    if (loading) return <p className="text-center mt-3">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-3">{error}</p>;

    return (
        <div className="container mx-auto p-4 min-h-screen bg-gray-300">
            <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h5 className="text-lg font-semibold">Total Jobs</h5>
                    <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h5 className="text-lg font-semibold">Active Jobs</h5>
                    <p className="text-3xl font-bold">{stats.active}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <ApplicationsList />
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <InquiryList />
                </div>
            </div>
        </div>
    );
};

export default AdDashboard;
