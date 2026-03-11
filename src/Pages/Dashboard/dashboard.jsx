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
        color: "white",
        position: "relative"
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


      {/* DASHBOARD TITLE */}
      <div style={{ padding: "40px" }}>
        <h1>Dashboard</h1>
      </div>


      {/* BOTTOM CENTER TEXT */}
      <div
        style={{
          position: "absolute",
          bottom: "120px",
          width: "100%",
          textAlign: "center"
        }}
      >

<img src="/image/logo.webp"/>
        <p>+91 88484 18551</p>

        <h2>neGbis ERP v8.0.6</h2>

      </div>

    </div>

  );
}

export default Dashboard;