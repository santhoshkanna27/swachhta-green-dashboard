import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ComplianceCard from "../components/ComplianceCard";

function Dashboard() {
 return (
  <div>
    <main>
      <Header />

      
        <div className="page-title">
  <h1>Dashboard</h1>
  <p>Swachhta & Green Compliance Overview</p>
</div>

        <section>
          <StatCard title="Overall Compliance" value="82%" />
          <StatCard title="Swachhta Score" value="88%" />
          <StatCard title="Green Score" value="76%" />
          <StatCard title="Open Issues" value="12" />
        </section>

        <section className="compliance-section">
  <h2>Compliance by Category</h2>
          <h2>Compliance by Category</h2>

          <ComplianceCard category="Cleanliness" score="90" />
          <ComplianceCard category="Waste Management" score="82" />
          <ComplianceCard category="Water Management" score="78" />
          <ComplianceCard category="Energy" score="75" />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;