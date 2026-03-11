import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [showReports, setShowReports] = useState(false);
  const [showSales, setShowSales] = useState(false);

  return (
    <div className="dashboard-container">

      {/* TOP MENU */}
      <div className="top-menu">
        <span className="menu-item">Dashboard</span>

        {/* REPORTS */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setShowReports(true)}
        >
          <span className="menu-item">Reports</span>

          {showReports && (
            <div
              className="dropdown"
              onMouseLeave={() => {
                setShowReports(false);
                setShowSales(false);
              }}
            >
              {/* SALES */}
              <div
                style={{
                  position: "relative",
                  padding: "6px",
                  cursor: "pointer"
                }}
                onMouseEnter={() => setShowSales(true)}
              >
                Sales ▶

                {showSales && (
                  <div
                    className="submenu"
                    onMouseLeave={() => setShowSales(false)}
                  >
                    <div
                      style={{ padding: "6px", cursor: "pointer" }}
                      onClick={() => navigate("/reports")}
                    >
                      Sales Report
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bottom-bar">
        <div>
          <img src="/image/logo.webp" className="logo" />
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "20px" }}>+91 88484 18551</p>
          <p style={{ margin: 0, fontSize: "20px" }}>
            contact@codezyntax.com
          </p>
        </div>

        <div>
          <h1 style={{ margin: 0, fontSize: "36px" }}>
            neGbis ERP v8.0.6
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;