import React, { useEffect, useState } from "react";
// import { Modal } from "bootstrap";

const ApplicationForm = () => {
    const [applications, setApplications] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emailData, setEmailData] = useState({ recipient: "", subject: "", name: "", jobTitle: "" });
    const [selectedApplication, setSelectedApplication] = useState(null);

    // ✅ Filter States
    const [filterJobTitle, setFilterJobTitle] = useState("");
    const [filterExp, setFilterExp] = useState("");
    const [filterTwelvethPer, setFilterTwelvethPer] = useState("");
    const [filterBachelorsPer, setFilterBachelorsPer] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    // ✅ Fetch Applications
    const fetchApplications = async () => {
        try {
            const response = await fetch("http://localhost:5000/applications");
            if (!response.ok) {
                throw new Error("Failed to fetch applications");
            }
            const data = await response.json();
            setApplications(data);
            setFilteredApps(data); // Initialize filtered list
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    // ✅ Apply Filters
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

    // ✅ Reset Filters
    const resetFilters = () => {
        setFilterJobTitle("");
        setFilterExp("");
        setFilterTwelvethPer("");
        setFilterBachelorsPer("");
        setFilteredApps(applications); // Restore full list
    };

    // ✅ Delete Application
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

    const openEmailModal = (email, name, jobTitle) => {
        setEmailData({
            recipient: email,
            name: name,
            jobTitle: jobTitle,
            subject: "",
        });

        const modalElement = document.getElementById("emailModal");
        if (modalElement) {
            const modal = new Modal(modalElement); // ✅ Use imported Modal
            modal.show();
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
                    to: emailData.recipient, // ✅ Corrected field name
                    subject: emailData.subject,
                    name: emailData.name,
                    jobTitle: emailData.jobTitle,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Email sent successfully!");
                setEmailData({ recipient: "", subject: "", name: "", jobTitle: "" });

                const modalElement = document.getElementById("emailModal");
                const modal = Modal.getInstance(modalElement);
                if (modal) modal.hide();
            } else {
                alert("❌ Failed to send email: " + data.error);
            }
        } catch (error) {
            console.error("❌ Error sending email:", error);
            alert("❌ Email sending failed.");
        }
    };

    // ✅ Open Delete Confirmation Modal
    const openDeleteModal = (id) => {
        setSelectedApplication(id);
        const deleteModal = new Modal(document.getElementById("deleteModal"));
        deleteModal.show();
    };

    // ✅ Delete Application
    const handleDelete = async () => {
        if (!selectedApplication) return;

        try {
            const response = await fetch(`http://localhost:5000/applications/${selectedApplication}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete application");

            setApplications((prev) => prev.filter((app) => app._id !== selectedApplication));
            setSelectedApplication(null);

            // Hide modal after deletion
            const deleteModal = Modal.getInstance(document.getElementById("deleteModal"));
            deleteModal.hide();

            alert("✅ Application deleted successfully!");
        } catch (error) {
            console.error("❌ Error deleting application:", error);
            alert("❌ Failed to delete application.");
        }
    };

    return (
        <div className="container mt-4">
            <h4 className="text-center fw-bold text-primary">Job Applications</h4>
            <hr />

            {/* ✅ Filters Section */}
            <div className="row mb-3">
                <div className="col-md-3">
                    <label className="small">Job Title:</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Enter job title"
                        value={filterJobTitle}
                        onChange={(e) => setFilterJobTitle(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <label className="small">Min Experience (years):</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        value={filterExp}
                        onChange={(e) => setFilterExp(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <label className="small">Min 12th Percentage:</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control form-control-sm"
                        value={filterTwelvethPer}
                        onChange={(e) => setFilterTwelvethPer(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <label className="small">Min Bachelor's Degree (%):</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control form-control-sm"
                        value={filterBachelorsPer}
                        onChange={(e) => setFilterBachelorsPer(e.target.value)}
                    />
                </div>
            </div>

            {/* ✅ Reset Filters Button */}
            <div className="text-end mb-3">
                <button className="btn btn-secondary btn-sm" onClick={resetFilters}>
                    Reset Filters
                </button>
            </div>

            {/* ✅ Loading Spinner */}
            {loading && (
                <div className="text-center mt-3">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            )}

            {/* ✅ Error Message */}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* ✅ Applications List (Horizontal Cards) */}
            {/* ✅ Applications List (Responsive Cards) */}
            <div className="row d-flex flex-wrap justify-content-start">
                {!loading && !error && filteredApps.length > 0 ? (
                    filteredApps.map((app) => (
                        <div key={app._id} className="col-12 col-sm-6 col-md-4 mb-3">
                            <div className="card p-3 shadow-sm h-100">
                                <div>
                                    <p className="mb-1 fs-6"><b>Job Title: </b>{app.jobTitle}</p>
                                    <p className="mb-1 fs-6"><b>Applicant Name: </b>{app.name}</p>
                                    <p className="mb-1 fs-6"><b>Experience: </b>{app.experience} years</p>
                                    <p className="mb-1 fs-6"><b>12th Percentage: </b>{app.twelvethPercentage}%</p>
                                    <p className="mb-1 fs-6"><b>Bachelor's Degree: </b>{app.bachelorsDegree}%</p>
                                </div>

                                <div className="mt-2">
                                    <p className="mb-1 fs-6"><b>Resume:</b></p>
                                    <a href={`http://localhost:5000${app.resume}`} target="_blank" rel="noopener noreferrer" className="fs-6">
                                        View Resume
                                    </a>
                                </div>

                                <hr className="my-2" />

                                {/* ✅ Action Buttons */}
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-success btn-sm me-2" onClick={() => openEmailModal(app.email, app.name, app.jobTitle)}>
                                        Send Email
                                    </button>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(app._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-muted text-center">No applications found.</p>
                )}
            </div>

            {/* ✅ Send Email Modal */}
            <div className="modal fade" id="emailModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-success">Send Email</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); sendEmail(); }}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Recipient</label>
                                    <input type="email" className="form-control" value={emailData.recipient} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Name</label>
                                    <input type="text" className="form-control" placeholder="Enter your Name" value={emailData.name} onChange={(e) => setEmailData({ ...emailData, name: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Job Title</label>
                                    <input type="text" className="form-control" placeholder="Enter Job Title" value={emailData.jobTitle} onChange={(e) => setEmailData({ ...emailData, jobTitle: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Selection</label>
                                    <select className="form-control" value={emailData.Subject} onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })} required>
                                        <option value="">Select an Option</option>
                                        <option value="selected">Selected</option>
                                        <option value="unselected">Unselected</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-success">
                                    Send Email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* ✅ Delete Confirmation Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger">Confirm Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this application? This action cannot be undone.</p>
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
};

export default ApplicationForm;
