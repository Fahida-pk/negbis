import { Routes, Route } from "react-router-dom";
import Login from "./Pages/login/Login";
import Dashboard from "./Pages/Dashboard/dashboard";

function App() {
  return (
    <Routes>

      {/* LOGIN PAGE */}
      <Route path="/" element={<Login />} />

      {/* DASHBOARD PAGE */}
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
}

export default App;