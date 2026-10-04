function ComplianceCard({ category, score }) {
  return (
    <div className="compliance-card">
      <div className="compliance-card-header">
        <h3>{category}</h3>
        <span>{score}%</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <p>Compliance Score</p>
    </div>
  );
}

export default ComplianceCard;