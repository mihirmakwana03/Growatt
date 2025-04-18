import React, { useEffect, useState } from "react";

const ApplicationForm = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailData, setEmailData] = useState({
    recipient: "",
    subject: "",
    name: "",
    jobTitle: "",
  });
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
        (filterJobTitle === "" ||
          app.jobTitle.toLowerCase().includes(filterJobTitle.toLowerCase())) &&
        (filterExp === "" || app.experience >= parseFloat(filterExp)) &&
        (filterTwelvethPer === "" ||
          app.twelvethPercentage >= parseFloat(filterTwelvethPer)) &&
        (filterBachelorsPer === "" ||
          app.bachelorsDegree >= parseFloat(filterBachelorsPer))
      );
    });
    setFilteredApps(filtered);
  }, [
    filterJobTitle,
    filterExp,
    filterTwelvethPer,
    filterBachelorsPer,
    applications,
  ]);

  const resetFilters = () => {
    setFilterJobTitle("");
    setFilterExp("");
    setFilterTwelvethPer("");
    setFilterBachelorsPer("");
    setFilteredApps(applications);
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this application?"))
      return;

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
    if (
      !emailData.recipient ||
      !emailData.subject ||
      !emailData.name ||
      !emailData.jobTitle
    ) {
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

        // Update status in the database
        const updateResponse = await fetch(
          `http://localhost:5000/applications/${selectedApplication._id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Mail Sent" }),
          }
        );

        if (!updateResponse.ok) {
          throw new Error(
            "Failed to update application status in the database"
          );
        }

        // Update local state
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApplication._id
              ? { ...app, status: "Mail Sent" }
              : app
          )
        );

        setEmailData({ recipient: "", subject: "", name: "", jobTitle: "" });
        setSelectedApplication(null);
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
      <h4 className="text-center font-bold text-blue-600 text-xl mb-4">
        Job Applications
      </h4>
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
          <label className="block text-sm font-medium">
            Min Experience (years):
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded p-2"
            value={filterExp}
            onChange={(e) => setFilterExp(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Min 12th Percentage:
          </label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 rounded p-2"
            value={filterTwelvethPer}
            onChange={(e) => setFilterTwelvethPer(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Min Bachelor's Degree (%):
          </label>
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
        {!loading && !error && filteredApps.length > 0
          ? filteredApps.map((app) => (
              <div key={app._id} className="border rounded shadow p-4">
                <p className="mb-2">
                  <b>Job Title:</b> {app.jobTitle}
                </p>
                <p className="mb-2">
                  <b>Applicant Name:</b> {app.name}
                </p>
                <p className="mb-2">
                  <b>Experience:</b> {app.experience} years
                </p>
                <p className="mb-2">
                  <b>12th Percentage:</b> {app.twelvethPercentage}%
                </p>
                <p className="mb-2">
                  <b>Bachelor's Degree:</b> {app.bachelorsDegree}%
                </p>
                <p className="mb-2">
                  <b>Status:</b>{" "}
                  <span
                    className={
                      app.status === "Pending"
                        ? "text-red-500"
                        : app.status === "Mail Sent"
                        ? "text-green-500"
                        : ""
                    }
                  >
                    {app.status}
                  </span>
                </p>
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
                    onClick={() => {
                      setEmailData({
                        recipient: app.email,
                        name: app.name,
                        jobTitle: app.jobTitle,
                      });
                      setSelectedApplication(app);
                    }}
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
          : !loading && (
              <p className="text-gray-500 text-center">
                No applications found.
              </p>
            )}
      </div>

      {/* Email Form Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="relative bg-black rounded-lg shadow-lg w-full max-w-md border border-gray-300">
            <div className="flex justify-between items-center border-b px-4 py-3">
              <h5 className="text-lg font-semibold text-green-600">
                Send Email
              </h5>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendEmail();
              }}
              className="border border-gray-300 rounded-lg"
            >
              <div className="px-4 py-4">
                <div className="mb-4">
                  <label className="block font-medium mb-1">Recipient</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={emailData.recipient}
                    readOnly
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter your Name"
                    value={emailData.name}
                    onChange={(e) =>
                      setEmailData({ ...emailData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1">Job Title</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter Job Title"
                    value={emailData.jobTitle}
                    onChange={(e) =>
                      setEmailData({ ...emailData, jobTitle: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1">Selection</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={emailData.subject}
                    onChange={(e) =>
                      setEmailData({ ...emailData, subject: e.target.value })
                    }
                    required
                  >
                    <option value="">Select an Option</option>
                    <option value="selected">Selected</option>
                    <option value="unselected">Unselected</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 px-4 py-3 border-t">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setSelectedApplication(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationForm;
