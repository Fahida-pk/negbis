import { Routes, Route } from "react-router-dom";
import Login from "./Pages/login/Login";
import Dashboard from "./Pages/Dashboard/dashboard";
import SalesInvoice from "./Pages/SalesInvoice";

function App() {
  return (
    <Routes>

      {/* LOGIN PAGE */}
      <Route path="/" element={<Login />} />

      {/* DASHBOARD PAGE */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* SALES INVOICE PAGE */}
      <Route path="/sales-invoice" element={<SalesInvoice />} />

    </Routes>
  );
}

export default App;