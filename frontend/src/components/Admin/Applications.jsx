import React, { useEffect, useState } from "react";

const ApplicationForm = () => {
    const [applications, setApplications] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emailData, setEmailData] = useState({ recipient: "", subject: "", name: "", jobTitle: "" });
    const [selectedApplication, setSelectedApplication] = useState(null);

    const [filterJobTitle, setFilterJobTitle] = useState("");
    const [filterExp, setFilterExp] = useState("");
    const [filterTwelvethPer, setFilterTwelvethPer] = useState("");
    const [filterBachelorsPer, setFilterBachelorsPer] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await fetch("http://localhost:5000/applications");
            if (!response.ok) {
                throw new Error("Failed to fetch applications");
            }
            const data = await response.json();
            setApplications(data);
            setFilteredApps(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = applications.filter((app) => {
            return (
                (filterJobTitle === "" || app.jobTitle.toLowerCase().includes(filterJobTitle.toLowerCase())) &&
                (filterExp === "" || app.experience >= parseFloat(filterExp)) &&
                (filterTwelvethPer === "" || app.twelvethPercentage >= parseFloat(filterTwelvethPer)) &&
                (filterBachelorsPer === "" || app.bachelorsDegree >= parseFloat(filterBachelorsPer))
            );
        });
        setFilteredApps(filtered);
    }, [filterJobTitle, filterExp, filterTwelvethPer, filterBachelorsPer, applications]);

    const resetFilters = () => {
        setFilterJobTitle("");
        setFilterExp("");
        setFilterTwelvethPer("");
        setFilterBachelorsPer("");
        setFilteredApps(applications);
    };

    const deleteApplication = async (id) => {
        if (!window.confirm("⚠️ Are you sure you want to delete this application?")) return;

        try {
            const response = await fetch(`http://localhost:5000/applications/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete application");

            setApplications((prev) => prev.filter((app) => app._id !== id));
            alert("✅ Application deleted successfully!");
        } catch (error) {
            console.error("❌ Error deleting application:", error);
            alert("❌ Failed to delete application.");
        }
    };

    const sendEmail = async () => {
        if (!emailData.recipient || !emailData.subject || !emailData.name || !emailData.jobTitle) {
            alert("❌ All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: emailData.recipient,
                    subject: emailData.subject,
                    name: emailData.name,
                    jobTitle: emailData.jobTitle,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Email sent successfully!");
                setEmailData({ recipient: "", subject: "", name: "", jobTitle: "" });
            } else {
                alert("❌ Failed to send email: " + data.error);
            }
        } catch (error) {
            console.error("❌ Error sending email:", error);
            alert("❌ Email sending failed.");
        }
    };

    return (
        <>
        <div className="container mx-auto p-4"></div>
            <h4 className="text-center font-bold text-blue-600 text-xl mb-4">Job Applications</h4>
            <hr className="mb-4" />

            {/* Filters Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4">
                <div>
                    <label className="block text-sm font-medium">Job Title:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Enter job title"
                        value={filterJobTitle}
                        onChange={(e) => setFilterJobTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Min Experience (years):</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded p-2"
                        value={filterExp}
                        onChange={(e) => setFilterExp(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Min 12th Percentage:</label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full border border-gray-300 rounded p-2"
                        value={filterTwelvethPer}
                        onChange={(e) => setFilterTwelvethPer(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Min Bachelor's Degree (%):</label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full border border-gray-300 rounded p-2"
                        value={filterBachelorsPer}
                        onChange={(e) => setFilterBachelorsPer(e.target.value)}
                    />
                </div>
            </div>

            {/* Reset Filters Button */}
                        <div className="flex justify-center mb-4">
                            <button
                                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-1/3"
                                onClick={resetFilters}
                            >
                                Reset Filters
                            </button>
                        </div>

                        {/* Loading Spinner */}
            {loading && (
                <div className="text-center mt-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
                </div>
            )}

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Applications List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {!loading && !error && filteredApps.length > 0 ? (
                    filteredApps.map((app) => (
                        <div key={app._id} className="border rounded shadow p-4">
                            <p className="mb-2"><b>Job Title:</b> {app.jobTitle}</p>
                            <p className="mb-2"><b>Applicant Name:</b> {app.name}</p>
                            <p className="mb-2"><b>Experience:</b> {app.experience} years</p>
                            <p className="mb-2"><b>12th Percentage:</b> {app.twelvethPercentage}%</p>
                            <p className="mb-2"><b>Bachelor's Degree:</b> {app.bachelorsDegree}%</p>
                            <a
                                href={`http://localhost:5000${app.resume}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                View Resume
                            </a>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    onClick={() => setEmailData({ recipient: app.email, name: app.name, jobTitle: app.jobTitle })}
                                >
                                    Send Email
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => deleteApplication(app._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-gray-500 text-center">No applications found.</p>
                )}
            </div>
        </>
    );
};

export default ApplicationForm;
