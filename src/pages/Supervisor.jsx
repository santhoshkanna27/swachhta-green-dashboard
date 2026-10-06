import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useComplaints } from "../context/ComplaintContext";

function Supervisor() {
  const { user, logout } = useAuth();
  const { complaints, updateComplaint } = useComplaints();

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [beforePhoto, setBeforePhoto] = useState(null);
  const [findingDetails, setFindingDetails] = useState("");
  const [actionRequired, setActionRequired] = useState("");

  const [afterPhoto, setAfterPhoto] = useState(null);
  const [actionTaken, setActionTaken] = useState("");
  const [resolutionDetails, setResolutionDetails] = useState("");

  const submittedCount = complaints.filter(
    (complaint) => complaint.status === "Submitted"
  ).length;

  const inProgressCount = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolvedCount = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  const openComplaint = (complaint) => {
    setSelectedComplaint(complaint);

    setBeforePhoto(complaint.beforePhoto || null);
    setFindingDetails(complaint.findingDetails || "");
    setActionRequired(complaint.actionRequired || "");

    setAfterPhoto(complaint.afterPhoto || null);
    setActionTaken(complaint.actionTaken || "");
    setResolutionDetails(
      complaint.resolutionDetails || ""
    );
  };

  const closeComplaint = () => {
    setSelectedComplaint(null);

    setBeforePhoto(null);
    setFindingDetails("");
    setActionRequired("");

    setAfterPhoto(null);
    setActionTaken("");
    setResolutionDetails("");
  };

  const handleBeforePhoto = (e) => {
    const file = e.target.files[0];

    if (file) {
      setBeforePhoto(file);
    }
  };

  const handleAfterPhoto = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAfterPhoto(file);
    }
  };

  const startCleaning = () => {
    if (!beforePhoto) {
      alert("Please upload a before-cleaning photo.");
      return;
    }

    if (!findingDetails.trim()) {
      alert("Please enter the finding/problem details.");
      return;
    }

    if (!actionRequired.trim()) {
      alert("Please enter the action required.");
      return;
    }

    updateComplaint(selectedComplaint.id, {
      beforePhoto: beforePhoto,
      findingDetails: findingDetails,
      actionRequired: actionRequired,
      status: "In Progress"
    });

    setSelectedComplaint({
      ...selectedComplaint,
      beforePhoto: beforePhoto,
      findingDetails: findingDetails,
      actionRequired: actionRequired,
      status: "In Progress"
    });
  };

  const resolveComplaint = () => {
    if (!afterPhoto) {
      alert("Please upload an after-cleaning photo.");
      return;
    }

    if (!actionTaken.trim()) {
      alert("Please enter the action taken.");
      return;
    }

    if (!resolutionDetails.trim()) {
      alert("Please enter the resolution details.");
      return;
    }

    updateComplaint(selectedComplaint.id, {
      afterPhoto: afterPhoto,
      actionTaken: actionTaken,
      resolutionDetails: resolutionDetails,
      status: "Resolved"
    });

    setSelectedComplaint({
      ...selectedComplaint,
      afterPhoto: afterPhoto,
      actionTaken: actionTaken,
      resolutionDetails: resolutionDetails,
      status: "Resolved"
    });
  };

  return (
    <main className="supervisor-page">

      <div className="supervisor-header">

        <div>
          <h1>Supervisor Portal</h1>

          <p>
            Manage complaints and cleaning activities
          </p>
        </div>

        <div className="supervisor-user">

          <span>
            {user?.name}
          </span>

          <button onClick={logout}>
            Logout
          </button>

        </div>

      </div>

      <section className="supervisor-summary">

        <div className="supervisor-summary-card">
          <span>Total Complaints</span>
          <strong>{complaints.length}</strong>
        </div>

        <div className="supervisor-summary-card">
          <span>Submitted</span>
          <strong>{submittedCount}</strong>
        </div>

        <div className="supervisor-summary-card">
          <span>In Progress</span>
          <strong>{inProgressCount}</strong>
        </div>

        <div className="supervisor-summary-card">
          <span>Resolved</span>
          <strong>{resolvedCount}</strong>
        </div>

      </section>

      <section className="supervisor-complaints-section">

        <div className="supervisor-section-heading">

          <h2>Complaints</h2>

          <p>
            Complaints submitted by students and faculty.
          </p>

        </div>

        {complaints.length === 0 ? (

          <div className="supervisor-empty-state">

            <h3>
              No complaints available
            </h3>

            <p>
              New student and faculty complaints will appear here.
            </p>

          </div>

        ) : (

          <div className="supervisor-complaints-list">

            {complaints.map((complaint) => (

              <div
                key={complaint.id}
                className="supervisor-complaint-card"
              >

                <div className="supervisor-complaint-header">

                  <div>

                    <h3>
                      {complaint.title}
                    </h3>

                    <p>
                      {complaint.building} · {complaint.floor}
                    </p>

                  </div>

                  <span
                    className={
                      "supervisor-status supervisor-status-" +
                      complaint.status
                        .toLowerCase()
                        .replace(" ", "-")
                    }
                  >
                    {complaint.status}
                  </span>

                </div>

                <div className="supervisor-complaint-details">

                  <div>
                    <span>Reported By</span>

                    <strong>
                      {complaint.reporterRole === "student"
                        ? "Student"
                        : "Faculty"}
                    </strong>
                  </div>

                  <div>
                    <span>Area</span>

                    <strong>
                      {complaint.area}
                    </strong>
                  </div>

                  <div>
                    <span>Category</span>

                    <strong>
                      {complaint.category}
                    </strong>
                  </div>

                  <div>
                    <span>Submitted</span>

                    <strong>
                      {new Date(
                        complaint.createdAt
                      ).toLocaleDateString()}
                    </strong>
                  </div>

                </div>

                <div className="supervisor-complaint-description">

                  <span>
                    Problem Description
                  </span>

                  <p>
                    {complaint.description}
                  </p>

                </div>

                <button
                  className="supervisor-view-button"
                  onClick={() => openComplaint(complaint)}
                >
                  View Complaint
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

      {selectedComplaint && (

        <div className="supervisor-modal-overlay">

          <div className="supervisor-modal">

            <div className="supervisor-modal-header">

              <div>

                <h2>
                  {selectedComplaint.title}
                </h2>

                <p>
                  Complaint Processing
                </p>

              </div>

              <button
                className="supervisor-close-button"
                onClick={closeComplaint}
              >
                ×
              </button>

            </div>

            <div className="supervisor-modal-details">

              <div>
                <span>Building / Block</span>

                <strong>
                  {selectedComplaint.building}
                </strong>
              </div>

              <div>
                <span>Floor</span>

                <strong>
                  {selectedComplaint.floor}
                </strong>
              </div>

              <div>
                <span>Area</span>

                <strong>
                  {selectedComplaint.area}
                </strong>
              </div>

              <div>
                <span>Category</span>

                <strong>
                  {selectedComplaint.category}
                </strong>
              </div>

              <div>
                <span>Reported By</span>

                <strong>
                  {selectedComplaint.reporterRole === "student"
                    ? "Student"
                    : "Faculty"}
                </strong>
              </div>

              <div>
                <span>Status</span>

                <strong>
                  {selectedComplaint.status}
                </strong>
              </div>

            </div>

            <div className="supervisor-modal-description">

              <span>
                Problem Description
              </span>

              <p>
                {selectedComplaint.description}
              </p>

            </div>

            {selectedComplaint.photos &&
              selectedComplaint.photos.length > 0 && (

                <div className="supervisor-modal-photos">

                  <span>
                    Submitted Photos
                  </span>

                  <div className="supervisor-photo-grid">

                    {selectedComplaint.photos.map(
                      (photo, index) => (

                        <img
                          key={index}
                          src={URL.createObjectURL(photo)}
                          alt={
                            "Complaint photo " +
                            (index + 1)
                          }
                        />

                      )
                    )}

                  </div>

                </div>

              )}

            {selectedComplaint.status === "Submitted" && (

              <div className="supervisor-processing-section">

                <h3>
                  Before Cleaning
                </h3>

                <div className="supervisor-processing-group">

                  <label>
                    Before-Cleaning Photo
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBeforePhoto}
                  />

                </div>

                <div className="supervisor-processing-group">

                  <label>
                    Finding / Problem Details
                  </label>

                  <textarea
                    placeholder="Describe what was found during inspection..."
                    value={findingDetails}
                    onChange={(e) =>
                      setFindingDetails(e.target.value)
                    }
                  />

                </div>

                <div className="supervisor-processing-group">

                  <label>
                    Action Required
                  </label>

                  <textarea
                    placeholder="Describe the cleaning or corrective action required..."
                    value={actionRequired}
                    onChange={(e) =>
                      setActionRequired(e.target.value)
                    }
                  />

                </div>

                <button
                  className="supervisor-start-button"
                  onClick={startCleaning}
                >
                  Start Cleaning
                </button>

              </div>

            )}

            {selectedComplaint.status === "In Progress" && (

              <div className="supervisor-processing-section">

                <h3>
                  After Cleaning
                </h3>

                <p className="supervisor-processing-info">
                  Complete the cleaning and provide
                  evidence before marking the complaint
                  as resolved.
                </p>

                <div className="supervisor-processing-group">

                  <label>
                    After-Cleaning Photo
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAfterPhoto}
                  />

                </div>

                <div className="supervisor-processing-group">

                  <label>
                    Action Taken
                  </label>

                  <textarea
                    placeholder="Describe what was done to solve the problem..."
                    value={actionTaken}
                    onChange={(e) =>
                      setActionTaken(e.target.value)
                    }
                  />

                </div>

                <div className="supervisor-processing-group">

                  <label>
                    Resolution Details
                  </label>

                  <textarea
                    placeholder="Describe how the complaint was resolved..."
                    value={resolutionDetails}
                    onChange={(e) =>
                      setResolutionDetails(e.target.value)
                    }
                  />

                </div>

                <button
                  className="supervisor-resolve-button"
                  onClick={resolveComplaint}
                >
                  Mark as Resolved
                </button>

              </div>

            )}

            {selectedComplaint.status === "Resolved" && (

              <div className="supervisor-processing-section">

                <h3>
                  Complaint Resolved
                </h3>

                <p className="supervisor-processing-info">
                  This complaint has been successfully
                  resolved.
                </p>

                {selectedComplaint.afterPhoto && (

                  <div className="supervisor-evidence-section">

                    <span>
                      After-Cleaning Photo
                    </span>

                    <img
                      src={URL.createObjectURL(
                        selectedComplaint.afterPhoto
                      )}
                      alt="After cleaning"
                    />

                  </div>

                )}

                <div className="supervisor-resolution-detail">

                  <span>
                    Action Taken
                  </span>

                  <p>
                    {selectedComplaint.actionTaken}
                  </p>

                </div>

                <div className="supervisor-resolution-detail">

                  <span>
                    Resolution Details
                  </span>

                  <p>
                    {selectedComplaint.resolutionDetails}
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </main>
  );
}

export default Supervisor;