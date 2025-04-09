import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
    if (error) return <p className="text-center text-danger mt-3">{error}</p>;

    return (
        <div className="container mt-4">
            <h2 className="text fw-bold text-primary">Admin Dashboard</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Jobs</h5>
                            <p className="card-text">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Active Jobs</h5>
                            <p className="card-text">{stats.active}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-1">
                <div class="row g-5">
                    <div class="col-md-6 text-black d-flex align-items-center justify-content-center p-4">
                        <ApplicationsList />
                    </div>

                    <div class="col-md-6 text-black d-flex align-items-center justify-content-center p-2 ">
                        <InquiryList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdDashboard;
