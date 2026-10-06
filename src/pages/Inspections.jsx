import { useState } from "react";
import { useInspections } from "../context/InspectionContext";

function Inspections() {
  const { inspectionList, addInspection } = useInspections();

  const [showForm, setShowForm] = useState(false);

  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [category, setCategory] = useState("Cleanliness");
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleSave = () => {
    if (!building || !floor || !date || !score) {
      alert(
        "Please enter building name, floor, date and compliance score."
      );
      return;
    }

    const newInspection = {
      id: Date.now(),
      building: building,
      floor: floor,
      date: date,
      category: category,
      score: Number(score),
      status: Number(score) >= 80 ? "Compliant" : "Partial",
      photos: photos
    };

    addInspection(newInspection);

    setShowForm(false);

    setBuilding("");
    setFloor("");
    setCategory("Cleanliness");
    setScore("");
    setDate("");
    setPhotos([]);
  };

  return (
    <main className="inspections-page">

      <div className="inspection-page-header">
        <div>
          <h1>Inspections</h1>

          <p>
            Manage and monitor compliance inspections
          </p>
        </div>

        <button onClick={() => setShowForm(true)}>
          + Add Inspection
        </button>
      </div>

      {showForm && (
        <div className="inspections-form">

          <h2>New Inspection</h2>

          <label>Building Name</label>

          <input
            type="text"
            placeholder="Enter building name"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          />

          <label>Floor Number</label>

          <input
            type="text"
            placeholder="Example: Ground Floor, 1st Floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />

          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Cleanliness</option>
            <option>Waste Management</option>
            <option>Water Management</option>
            <option>Sanitation & Hygiene</option>
            <option>Energy</option>
            <option>Green Practices</option>
          </select>

          <label>Compliance Score</label>

          <input
            type="number"
            min="0"
            max="100"
            placeholder="Enter score (0-100)"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />

          <label>Inspection Photos</label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setPhotos(Array.from(e.target.files))
            }
          />

          {photos.length > 0 && (
            <div className="photo-preview">

              {photos.map((photo, index) => (
                <div
                  className="photo-preview-item"
                  key={index}
                >
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Preview ${index + 1}`}
                  />

                  <span>
                    {photo.name}
                  </span>
                </div>
              ))}

            </div>
          )}

          <div className="form-actions">

            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save Inspection
            </button>

            <button
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      <div className="inspection-list">

        {inspectionList.length === 0 ? (

          <div className="empty-state">

            <h3>No inspections yet</h3>

            <p>
              Click "Add Inspection" to create your
              first inspection.
            </p>

          </div>

        ) : (

          inspectionList.map((inspection) => (

            <div
              className="inspection-card"
              key={inspection.id}
            >

              <div className="inspection-card-header">

                <div>

                  <h3>
                    {inspection.building ||
                      "Building Not Specified"}
                  </h3>

                  <p>
                    {inspection.floor ||
                      "Floor Not Specified"}
                  </p>

                  <p>
                    {inspection.date}
                  </p>

                </div>

                <span
                  className={`inspection-status ${
                    inspection.status === "Compliant"
                      ? "status-compliant"
                      : "status-partial"
                  }`}
                >
                  {inspection.status}
                </span>

              </div>

              <div className="inspection-category">

                <span>
                  Category
                </span>

                <strong>
                  {inspection.category}
                </strong>

              </div>

              <div className="inspection-score">

                <span>
                  Compliance Score
                </span>

                <strong>
                  {inspection.score}%
                </strong>

              </div>

              {inspection.photos &&
                inspection.photos.length > 0 && (

                  <div className="inspection-photos">

                    {inspection.photos.map(
                      (photo, index) => (

                        <img
                          key={index}
                          src={URL.createObjectURL(photo)}
                          alt={`Inspection ${index + 1}`}
                        />

                      )
                    )}

                  </div>

                )}

            </div>

          ))

        )}

      </div>

    </main>
  );
}

export default Inspections;