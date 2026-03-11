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


      {/* BOTTOM INFO BAR */}
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 120px"
        }}
      >

        {/* LEFT SIDE */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src="/image/logo.webp"
            style={{ width: "80px" }}
          />

          <div>
            <h2 style={{ margin: 0 }}>CodeZyntax</h2>
            <p style={{ margin: 0 }}>Softwares L.L.P</p>
          </div>
        </div>


        {/* CENTER */}
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0 }}>+91 88484 18551</p>
          <p style={{ margin: 0 }}>contact@codezyntax.com</p>
        </div>


        {/* RIGHT */}
        <div>
          <h1 style={{ margin: 0 }}>neGbis ERP v8.0.6</h1>
        </div>

      </div>

    </div>

  );
}

export default Dashboard;