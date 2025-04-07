import React, { useEffect, useState } from "react";

function ApplicationForm() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emailData, setEmailData] = useState({ recipient: "", subject: "", name: "", jobTitle: "" });

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
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    // ✅ Show Send Email Modal
    const openEmailModal = (email, name) => {
        setEmailData({ recipient: email, subject: "", name: name, jobTitle: "" });
        const modal = new window.bootstrap.Modal(document.getElementById("emailModal"));
        modal.show();
    };

    // ✅ Send Email
    const sendEmail = async () => {
        try {
            const response = await fetch("http://localhost:5000/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: emailData.recipient,
                    name: emailData.name,
                    jobTitle: emailData.jobTitle,
                    subject: emailData.subject,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Email sent successfully!");
                setEmailData({ recipient: "", subject: "", name: "", jobTitle: "" });
                const modal = window.bootstrap.Modal.getInstance(document.getElementById("emailModal"));
                if (modal) modal.hide();
            } else {
                alert("❌ Failed to send email: " + data.error);
            }
        } catch (error) {
            console.error("❌ Error sending email:", error);
            alert("❌ Email sending failed.");
        }
    };

    // ✅ Delete Application
    const deleteApplication = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/applications/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get the actual response (HTML or JSON)
                throw new Error(`Failed to delete: ${errorText}`);
            }

            const data = await response.json();
            alert("✅ Application deleted successfully!");
            setApplications((prev) => prev.filter((app) => app._id !== id)); // Update UI

        } catch (error) {
            console.error("❌ Error deleting application:", error);
            alert("❌ Failed to delete application: " + error.message);
        }
    };


    return (
        <div className="container mt-5">
            <h2 className="text-center fw-bold text-primary">Job Applications</h2>
            <hr />

            {/* ✅ Loading Spinner */}
            {loading && (
                <div className="text-center mt-4">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            )}

            {/* ✅ Error Message */}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* ✅ Applications Table */}
            {!loading && !error && applications.length > 0 ? (
                <table className="table table-bordered mt-4">
                    <thead className="table-dark">
                        <tr align="center">
                            <th>SR No.</th>
                            <th>Job Title</th>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>Resume</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody align="center">
                        {applications.map((app, index) => (
                            <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>{app.jobTitle}</td>
                                <td>{app.name}</td>
                                <td>{app.email}</td>
                                <td>
                                    <a href={`http://localhost:5000${app.resume}`} target="_blank" rel="noopener noreferrer">
                                        View Resume
                                    </a>
                                </td>
                                <td>
                                    <button className="btn btn-success btn-sm me-2" onClick={() => openEmailModal(app.email)}>
                                        Send Email
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteApplication(app._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && <p className="text-muted text-center">No applications found.</p>
            )}

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
                                    <label className="form-label fw-bold">Subject</label>
                                    <input type="text" className="form-control" placeholder="Enter subject" value={emailData.subject} onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })} required />
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
        </div>
    );
}

export default ApplicationForm;
