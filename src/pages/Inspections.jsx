import { useState } from "react";
import { inspections } from "../data/dummyData";

function Inspections() {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("Cleanliness");
  return (
    <main>
      <h1>Inspections</h1>
      <button onClick={() => setShowForm(true)}>
  Add Inspection
</button>
      <p>Manage and monitor compliance inspections</p>
{showForm && (
  <div>
    <h2>New Inspection</h2>

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

    <br /><br />

    <label>Score</label>
<input
  type="number"
  min="0"
  max="100"
  value={score}
  onChange={(e) => setScore(e.target.value)}
/>

    <br /><br />

    <label>Finding</label>
    <textarea />

    <br /><br />

    <button>Save Inspection</button>

    <button onClick={() => setShowForm(false)}>
      Cancel
    </button>
  </div>
)}
      <div>
        {inspections.map((inspection) => (
          <div key={inspection.id}>
            <h3>{inspection.category}</h3>
            <p>Date: {inspection.date}</p>
            <p>Score: {inspection.score}%</p>
            <p>Status: {inspection.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Inspections;