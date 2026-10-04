import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ComplianceCard from "../components/ComplianceCard";
import { dashboardStats, categoryData } from "../data/dummyData";

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
  <StatCard
    title={dashboardStats[0].title}
    value={dashboardStats[0].value}
  />

  <StatCard
    title={dashboardStats[1].title}
    value={dashboardStats[1].value}
  />

  <StatCard
    title={dashboardStats[2].title}
    value={dashboardStats[2].value}
  />

  <StatCard
    title={dashboardStats[3].title}
    value={dashboardStats[3].value}
  />
</section>
        

        <section className="compliance-section">
  <h2>Compliance by Category</h2>
          <h2>Compliance by Category</h2>

          {categoryData.map((item) => (
  <ComplianceCard
    key={item.category}
    category={item.category}
    score={item.score}
  />
))}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;