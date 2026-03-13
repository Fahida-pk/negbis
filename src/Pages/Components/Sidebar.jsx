import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChartLine, FaFileInvoiceDollar, FaFileAlt, FaHome } from "react-icons/fa";
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
<span className="logo-title">neGbis</span>
</div>


{/* DASHBOARD */}

<div
className="sidebar-item"
onClick={()=>navigate("/dashboard")}
>
<FaHome className="icon"/> Dashboard
</div>


<div className="sidebar-menu">

{/* REPORTS */}

<div
className="sidebar-item"
onClick={()=>setShowReports(!showReports)}
>
<FaFileAlt className="icon"/> Reports ^
</div>


{/* SALES */}

{showReports && (

<div
className="sidebar-subitem"
onClick={()=>setShowSales(!showSales)}
>
<FaChartLine className="icon"/> Sales
</div>

)}


{/* INVOICE */}

{showSales && (

<div
className="sidebar-subitem2"
onClick={()=>navigate("/reports")}
>
<FaFileInvoiceDollar className="icon"/> Invoice
</div>

)}

</div>

</div>

);

}

export default Sidebar;