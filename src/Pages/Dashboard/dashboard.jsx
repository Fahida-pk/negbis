import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Dashboard() {

  const navigate = useNavigate();

  const [showReports, setShowReports] = useState(false);
  const [showSales, setShowSales] = useState(false);

  return (

    <div
      style={{
        backgroundImage: "url('/image/bagroundimage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        position: "relative"
      }}
    >

      {/* TOP MENU */}
      <div style={{ display: "flex", gap: "20px", padding: "10px", background: "#1c2a3a" }}>

        <span style={{ cursor: "pointer" }}>Dashboard</span>

        {/* REPORTS MENU */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setShowReports(true)}
          onMouseLeave={() => setShowReports(false)}
        >

          <span style={{ cursor: "pointer" }}>Reports</span>

          {showReports && (

            <div
              style={{
                position: "absolute",
                top: "30px",
                background: "white",
                color: "black",
                padding: "10px",
                width: "150px"
              }}
            >

              {/* SALES MENU */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setShowSales(true)}
                onMouseLeave={() => setShowSales(false)}
              >

                <div style={{ cursor: "pointer" }}>Sales ▶</div>

                {showSales && (

                  <div
                    style={{
                      position: "absolute",
                      left: "150px",
                      top: "0",
                      background: "white",
                      padding: "10px",
                      width: "150px"
                    }}
                  >

                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/sales-invoice")}
                    >
                      Invoice
                    </div>

                  </div>

                )}

              </div>

            </div>

          )}

        </div>

      </div>


      {/* BOTTOM INFO BAR */}
      <div
        style={{
          position: "absolute",
          bottom: "140px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 160px"
        }}
      >

        {/* LEFT SIDE */}
        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <img
            src="/image/logo.webp"
            style={{
              width: "200px",
              filter: "brightness(0) invert(1)"
            }}
          />
        </div>


        {/* CENTER */}
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "20px" }}>+91 88484 18551</p>
          <p style={{ margin: 0, fontSize: "20px" }}>contact@codezyntax.com</p>
        </div>


        {/* RIGHT */}
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