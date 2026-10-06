import { useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ComplianceCard from "../components/ComplianceCard";
import { useInspections } from "../context/InspectionContext";
import { categoryData } from "../data/dummyData";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

function Dashboard() {
  const { inspectionList } = useInspections();

  const [selectedBuilding, setSelectedBuilding] = useState("");

  // ================================
  // BLOCK-WISE COMPLIANCE
  // ================================

  const buildingScores = {};

  inspectionList.forEach((inspection) => {
    if (!inspection.building) {
      return;
    }

    if (!buildingScores[inspection.building]) {
      buildingScores[inspection.building] = [];
    }

    buildingScores[inspection.building].push(
      inspection.score
    );
  });

  const buildingData = Object.entries(buildingScores).map(
    ([building, scores]) => {
      const total = scores.reduce(
        (sum, score) => sum + score,
        0
      );

      const average = total / scores.length;

      return {
        building: building,
        score: Math.round(average)
      };
    }
  );

  // ================================
  // BUILDING LIST
  // ================================

  const buildings = [
    ...new Set(
      inspectionList
        .map((inspection) => inspection.building)
        .filter(Boolean)
    )
  ];

  const activeBuilding =
    selectedBuilding || buildings[0] || "";

  // ================================
  // FLOOR-WISE COMPLIANCE
  // ================================

  const floorScores = {};

  inspectionList
    .filter(
      (inspection) =>
        inspection.building === activeBuilding
    )
    .forEach((inspection) => {
      if (!floorScores[inspection.floor]) {
        floorScores[inspection.floor] = [];
      }

      floorScores[inspection.floor].push(
        inspection.score
      );
    });

  const floorData = Object.entries(floorScores).map(
    ([floor, scores]) => {
      const total = scores.reduce(
        (sum, score) => sum + score,
        0
      );

      return {
        floor: floor,
        score: Math.round(total / scores.length)
      };
    }
  );

  // ================================
  // COLORS FOR BLOCKS
  // ================================

  const chartColors = [
    "#1c355e",
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#7c3aed",
    "#0891b2"
  ];

  return (
    <div>
      <main>

        <Header />

        {/* PAGE TITLE */}

        <div className="page-title">
          <h1>Dashboard</h1>

          <p>
            Swachhta & Green Compliance Overview
          </p>
        </div>


        {/* ================================
            STATISTICS
        ================================= */}

        <section>

          <StatCard
            title="Overall Compliance"
            value="85%"
          />

          <StatCard
            title="Swachhta Score"
            value="88%"
          />

          <StatCard
            title="Green Score"
            value="76%"
          />

          <StatCard
            title="Open Issues"
            value="12"
          />

        </section>


        {/* ================================
            BLOCK-WISE ANALYSIS
        ================================= */}

        <section className="analytics-section">

          <div className="analytics-header">

            <div>
              <h2>
                Block-wise Compliance Analysis
              </h2>

              <p>
                Average compliance score for each
                building or block
              </p>
            </div>

          </div>


          {buildingData.length === 0 ? (

            <div className="analytics-empty">

              <h3>
                No building data available
              </h3>

              <p>
                Add an inspection with a building name
                to see block-wise analysis.
              </p>

            </div>

          ) : (

            <div className="chart-container">

              <ResponsiveContainer
                width="100%"
                height={350}
              >

                <BarChart
                  data={buildingData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 10,
                    bottom: 20
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="building"
                  />

                  <YAxis
                    domain={[0, 100]}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `${value}%`,
                      "Compliance"
                    ]}
                  />

                  <Bar
                    dataKey="score"
                    radius={[6, 6, 0, 0]}
                  >

                    {buildingData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            chartColors[
                              index % chartColors.length
                            ]
                          }
                        />
                      )
                    )}

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            </div>

          )}

        </section>


        {/* ================================
            FLOOR-WISE ANALYSIS
        ================================= */}

        {buildingData.length > 0 && (

          <section className="analytics-section">

            <div className="analytics-header">

              <div>

                <h2>
                  Floor-wise Analysis
                </h2>

                <p>
                  View compliance scores for individual
                  floors
                </p>

              </div>


              {/* BUILDING SELECTOR */}

              <select
                value={activeBuilding}
                onChange={(e) =>
                  setSelectedBuilding(e.target.value)
                }
                className="building-selector"
              >

                {buildings.map((building) => (

                  <option
                    key={building}
                    value={building}
                  >
                    {building}
                  </option>

                ))}

              </select>

            </div>


            {/* FLOOR CHART */}

            <div className="chart-container">

              <ResponsiveContainer
                width="100%"
                height={350}
              >

                <BarChart
                  data={floorData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 10,
                    bottom: 20
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="floor"
                  />

                  <YAxis
                    domain={[0, 100]}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `${value}%`,
                      "Compliance"
                    ]}
                  />

                  <Bar
                    dataKey="score"
                    radius={[6, 6, 0, 0]}
                  >

                    {floorData.map(
                      (entry, index) => (
                        <Cell
                          key={`floor-cell-${index}`}
                          fill={
                            chartColors[
                              index % chartColors.length
                            ]
                          }
                        />
                      )
                    )}

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            </div>

          </section>

        )}


        {/* ================================
            CATEGORY ANALYSIS
        ================================= */}

        <section className="compliance-section">

          <h2>
            Compliance by Category
          </h2>

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