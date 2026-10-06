import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useComplaints } from "../context/ComplaintContext";

function Faculty() {
  const { user, logout } = useAuth();
  const { complaints, addComplaint } = useComplaints();

  const [title, setTitle] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !title ||
      !building ||
      !floor ||
      !area ||
      !category ||
      !description
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const newComplaint = {
      id: Date.now(),
      title: title,
      building: building,
      floor: floor,
      area: area,
      category: category,
      description: description,
      photos: photos,
      reportedBy: user?.name || "Faculty",
      reporterUsername: user?.username || "",
      reporterRole: "faculty",
      status: "Submitted",
      createdAt: new Date().toISOString(),

      beforePhoto: null,
      afterPhoto: null,
      findingDetails: "",
      actionRequired: "",
      actionTaken: "",
      resolutionDetails: ""
    };

    addComplaint(newComplaint);

    setTitle("");
    setBuilding("");
    setFloor("");
    setArea("");
    setCategory("");
    setDescription("");
    setPhotos([]);

    setSuccess("Your complaint has been submitted successfully.");
  };

  const myComplaints = complaints.filter(
    (complaint) =>
      complaint.reporterUsername === user?.username &&
      complaint.reporterRole === "faculty"
  );

  return (
    <main className="faculty-page">

      <div className="faculty-header">
        <div>
          <h1>Faculty Portal</h1>
          <p>
            Report cleanliness, maintenance and environmental issues
          </p>
        </div>

        <div className="faculty-user">
          <span>{user?.name}</span>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <section className="faculty-form-card">

        <div className="faculty-form-heading">
          <h2>Submit a Complaint</h2>

          <p>
            Report any issue that requires cleaning, maintenance or corrective action.
          </p>
        </div>

        {error && (
          <div className="faculty-error">
            {error}
          </div>
        )}

        {success && (
          <div className="faculty-success">
            {success}
          </div>
        )}

        <form
          className="faculty-complaint-form"
          onSubmit={handleSubmit}
        >

          <div className="faculty-form-group">
            <label>Complaint Title</label>

            <input
              type="text"
              placeholder="Example: Corridor floor needs cleaning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="faculty-form-row">

            <div className="faculty-form-group">
              <label>Building / Block</label>

              <input
                type="text"
                placeholder="Enter building or block"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              />
            </div>

            <div className="faculty-form-group">
              <label>Floor</label>

              <input
                type="text"
                placeholder="Example: Ground Floor"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              />
            </div>

          </div>

          <div className="faculty-form-row">

            <div className="faculty-form-group">
              <label>Area</label>

              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">Select area</option>
                <option value="Classroom">Classroom</option>
                <option value="Corridor">Corridor</option>
                <option value="Restroom">Restroom</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Canteen">Canteen</option>
                <option value="Staircase">Staircase</option>
                <option value="Parking Area">Parking Area</option>
              </select>
            </div>

            <div className="faculty-form-group">
              <label>Category</label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Waste Management">
                  Waste Management
                </option>
                <option value="Water Management">
                  Water Management
                </option>
                <option value="Sanitation & Hygiene">
                  Sanitation & Hygiene
                </option>
                <option value="Energy">Energy</option>
                <option value="Green Practices">
                  Green Practices
                </option>
                <option value="Infrastructure / Maintenance">
                  Infrastructure / Maintenance
                </option>
                <option value="Electrical">Electrical</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          <div className="faculty-form-group">
            <label>Problem Description</label>

            <textarea
              placeholder="Describe the issue in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="faculty-form-group">
            <label>Upload Photos</label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
            />

            <small>
              You can upload multiple photos. Video uploads are not allowed.
            </small>
          </div>

          <button
            type="submit"
            className="faculty-submit-btn"
          >
            Submit Complaint
          </button>

        </form>
      </section>

      <section className="faculty-complaints-section">

        <div className="faculty-section-heading">
          <div>
            <h2>My Complaints</h2>

            <p>
              View the complaints you have submitted.
            </p>
          </div>
        </div>

        {myComplaints.length === 0 ? (

          <div className="faculty-empty-state">
            <h3>No complaints yet</h3>

            <p>
              Your submitted complaints will appear here.
            </p>
          </div>

        ) : (

          <div className="faculty-complaints-list">

            {myComplaints.map((complaint) => (

              <div
                className="faculty-complaint-card"
                key={complaint.id}
              >

                <div className="faculty-complaint-header">

                  <div>
                    <h3>{complaint.title}</h3>

                    <p>
                      {complaint.building} · {complaint.floor}
                    </p>
                  </div>

                  <span
                    className={`faculty-status faculty-status-${complaint.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {complaint.status}
                  </span>

                </div>

                <div className="faculty-complaint-details">

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

                </div>

                <div className="faculty-complaint-description">

                  <span>Problem</span>

                  <p>
                    {complaint.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Faculty;