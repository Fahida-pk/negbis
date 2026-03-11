import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        backgroundImage: "url('/image/bagroundimage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white"
      }}
    >

      {/* TOP MENU */}
      <div style={{ display: "flex", gap: "20px", padding: "15px", background: "#1c2a3a" }}>
        <span style={{ cursor: "pointer" }}>Dashboard</span>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/reports")}
        >
          Reports
        </span>
      </div>

      {/* DASHBOARD CONTENT */}
      <div style={{ padding: "40px" }}>

        <h1>Dashboard</h1>

        {/* BOTTOM TEXT */}
        <div style={{ position: "absolute", bottom: "120px", left: "60px" }}>

          <h2>CodeZyntax Softwares L.L.P</h2>

          <p>+91 88484 18551</p>

          <h2>neGbis ERP v8.0.6</h2>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;