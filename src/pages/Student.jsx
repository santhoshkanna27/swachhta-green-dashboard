import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useComplaints } from "../context/ComplaintContext";

function Student() {

  const { user, logout } = useAuth();

  const { complaints, addComplaint } =
    useComplaints();


  const [title, setTitle] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  /*
    =====================================================
    PHOTO SELECTION
    =====================================================
  */

  const handlePhotoChange = (e) => {

    const selectedPhotos =
      Array.from(e.target.files);

    setPhotos(selectedPhotos);

  };


  /*
    =====================================================
    SUBMIT COMPLAINT
    =====================================================
  */

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

      setError(
        "Please fill in all required fields."
      );

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

      reportedBy:
        user?.name || "Student",

      reporterUsername:
        user?.username || "",

      reporterRole: "student",

      status: "Submitted",

      createdAt:
        new Date().toISOString(),

      afterPhoto: null,

      resolutionDetails: ""

    };


    addComplaint(newComplaint);


    /*
      Clear form
    */

    setTitle("");
    setBuilding("");
    setFloor("");
    setArea("");
    setCategory("");
    setDescription("");
    setPhotos([]);


    setSuccess(
      "Your complaint has been submitted successfully."
    );

  };


  /*
    =====================================================
    STUDENT'S COMPLAINTS
    =====================================================
  */

  const myComplaints =
    complaints.filter(
      (complaint) =>
        complaint.reporterUsername ===
        user?.username
    );


  return (

    <main className="student-page">


      {/* =================================================
          HEADER
          ================================================= */}

      <div className="student-header">

        <div>

          <h1>
            Student Portal
          </h1>

          <p>
            Report and track cleanliness
            and green compliance issues
          </p>

        </div>


        <div className="student-user">

          <span>
            {user?.name}
          </span>

          <button
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>


      {/* =================================================
          SUBMIT COMPLAINT
          ================================================= */}

      <section className="student-form-card">

        <div className="student-form-heading">

          <h2>
            Submit a Complaint
          </h2>

          <p>
            Report any cleanliness,
            maintenance or environmental issue.
          </p>

        </div>


        {error && (

          <div className="student-error">
            {error}
          </div>

        )}


        {success && (

          <div className="student-success">
            {success}
          </div>

        )}


        <form
          className="student-complaint-form"
          onSubmit={handleSubmit}
        >


          {/* TITLE */}

          <div className="student-form-group">

            <label>
              Complaint Title
            </label>

            <input
              type="text"
              placeholder="Example: Overflowing dustbin near canteen"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>


          {/* BUILDING + FLOOR */}

          <div className="student-form-row">


            <div className="student-form-group">

              <label>
                Building / Block
              </label>

              <input
                type="text"
                placeholder="Enter building or block name"
                value={building}
                onChange={(e) =>
                  setBuilding(e.target.value)
                }
              />

            </div>


            <div className="student-form-group">

              <label>
                Floor
              </label>

              <input
                type="text"
                placeholder="Example: 2nd Floor"
                value={floor}
                onChange={(e) =>
                  setFloor(e.target.value)
                }
              />

            </div>

          </div>


          {/* AREA */}

          <div className="student-form-group">

            <label>
              Area
            </label>

            <select
              value={area}
              onChange={(e) =>
                setArea(e.target.value)
              }
            >

              <option value="">
                Select area
              </option>

              <option value="Classroom">
                Classroom
              </option>

              <option value="Corridor">
                Corridor
              </option>

              <option value="Restroom">
                Restroom
              </option>

              <option value="Laboratory">
                Laboratory
              </option>

              <option value="Canteen">
                Canteen
              </option>

              <option value="Staircase">
                Staircase
              </option>

              <option value="Parking Area">
                Parking Area
              </option>

            </select>

          </div>


          {/* CATEGORY */}

          <div className="student-form-group">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              <option value="">
                Select category
              </option>

              <option value="Cleanliness">
                Cleanliness
              </option>

              <option value="Waste Management">
                Waste Management
              </option>

              <option value="Water Management">
                Water Management
              </option>

              <option value="Sanitation & Hygiene">
                Sanitation & Hygiene
              </option>

              <option value="Energy">
                Energy
              </option>

              <option value="Green Practices">
                Green Practices
              </option>

              <option value="Infrastructure / Maintenance">
                Infrastructure / Maintenance
              </option>

              <option value="Electrical">
                Electrical
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* DESCRIPTION */}

          <div className="student-form-group">

            <label>
              Problem Description
            </label>

            <textarea
              placeholder="Describe the problem clearly..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

          </div>


          {/* PHOTOS */}

          <div className="student-form-group">

            <label>
              Photos
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
            />

            <small>
              You can upload multiple photos.
            </small>

          </div>


          {/* PHOTO PREVIEW */}

          {photos.length > 0 && (

            <div className="student-photo-preview">

              {photos.map(
                (photo, index) => (

                  <div
                    className="student-photo-item"
                    key={index}
                  >

                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Complaint ${index + 1}`}
                    />

                    <span>
                      {photo.name}
                    </span>

                  </div>

                )
              )}

            </div>

          )}


          {/* SUBMIT */}

          <button
            type="submit"
            className="student-submit-btn"
          >
            Submit Complaint
          </button>

        </form>

      </section>


      {/* =================================================
          MY COMPLAINTS
          ================================================= */}

      <section className="student-complaints-section">


        <div className="student-section-heading">

          <div>

            <h2>
              My Complaints
            </h2>

            <p>
              Track the complaints you have submitted.
            </p>

          </div>

        </div>


        {myComplaints.length === 0 ? (

          <div className="student-empty-state">

            <h3>
              No complaints yet
            </h3>

            <p>
              Your submitted complaints
              will appear here.
            </p>

          </div>

        ) : (


          <div className="student-complaints-list">

            {myComplaints.map(
              (complaint) => (

                <div
                  className="student-complaint-card"
                  key={complaint.id}
                >


                  {/* CARD HEADER */}

                  <div className="student-complaint-header">

                    <div>

                      <h3>
                        {complaint.title}
                      </h3>

                      <p>
                        {complaint.building}
                        {" · "}
                        {complaint.floor}
                      </p>

                    </div>


                    <span
                      className={`student-status student-status-${complaint.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {complaint.status}
                    </span>

                  </div>


                  {/* DETAILS */}

                  <div className="student-complaint-details">


                    <div>

                      <span>
                        Area
                      </span>

                      <strong>
                        {complaint.area}
                      </strong>

                    </div>


                    <div>

                      <span>
                        Category
                      </span>

                      <strong>
                        {complaint.category}
                      </strong>

                    </div>


                  </div>


                  {/* DESCRIPTION */}

                  <div className="student-complaint-description">

                    <span>
                      Problem
                    </span>

                    <p>
                      {complaint.description}
                    </p>

                  </div>


                  {/* SUBMITTED PHOTOS */}

                  {complaint.photos &&
                    complaint.photos.length > 0 && (

                      <div className="student-complaint-photos">

                        <span>
                          Submitted Photos
                        </span>


                        <div className="student-photo-grid">

                          {complaint.photos.map(
                            (photo, index) => (

                              <img
                                key={index}
                                src={URL.createObjectURL(photo)}
                                alt={`Complaint ${index + 1}`}
                              />

                            )
                          )}

                        </div>

                      </div>

                    )}


                  {/* RESOLUTION */}

                  {complaint.status ===
                    "Resolved" && (

                    <div className="student-resolution">


                      <h4>
                        Resolution
                      </h4>


                      {complaint.afterPhoto && (

                        <div>

                          <span>
                            After Cleaning
                          </span>

                          <img
                            src={
                              URL.createObjectURL(
                                complaint.afterPhoto
                              )
                            }
                            alt="After cleaning"
                          />

                        </div>

                      )}


                      {complaint.resolutionDetails && (

                        <div>

                          <span>
                            Resolution Details
                          </span>

                          <p>
                            {complaint.resolutionDetails}
                          </p>

                        </div>

                      )}

                    </div>

                  )}

                </div>

              )
            )}

          </div>

        )}

      </section>

    </main>

  );
}

export default Student;