function ComplianceCard({ category, score }) {
  return (
    <div>
      <h3>{category}</h3>
      <p>{score}% Compliance</p>
    </div>
  );
}

export default ComplianceCard;