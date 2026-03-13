import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChartBar, FaFileInvoice, FaFileAlt, FaHome } from "react-icons/fa";
import "./sidebar.css";

function Sidebar(){

const navigate = useNavigate();

const [showReports,setShowReports] = useState(false);
const [showSales,setShowSales] = useState(false);

return(

<div className="sidebar">

{/* LOGO */}

<div className="logo-section">
<img src="/image/logo.jpg" alt="logo" className="logo-img"/>
<h2 className="logo-title">neGbis</h2>
</div>


<div
className="sidebar-item"
onClick={()=>navigate("/dashboard")}
>
Dashboard
</div>

<div className="sidebar-menu">

{/* REPORTS */}

<div
className="sidebar-item"
onClick={()=>setShowReports(!showReports)}
>
<FaFileAlt className="icon"/> Reports
</div>


{/* DASHBOARD SHOW ONLY WHEN REPORT CLICK */}

{showReports && (

<div
className="sidebar-subitem"
onClick={()=>navigate("/dashboard")}
>
<FaHome className="icon"/> Dashboard
</div>

)}


{/* SALES */}

{showReports && (

<div
className="sidebar-subitem"
onClick={()=>setShowSales(!showSales)}
>
<FaChartBar className="icon"/> Sales
</div>

)}


{/* INVOICE */}

{showSales && (

<div
className="sidebar-subitem2"
onClick={()=>navigate("/reports")}
>
<FaFileInvoice className="icon"/> Invoice
</div>

)}

</div>

</div>

);

}

export default Sidebar;