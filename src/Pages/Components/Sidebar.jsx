import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
FaTachometerAlt,
FaChartPie,
FaChevronDown,
FaChevronRight,
FaFileInvoiceDollar
} from "react-icons/fa";

import "./sidebar.css";

function Sidebar(){

const navigate = useNavigate();

const [reportOpen,setReportOpen] = useState(false);

return(

<div className="sidebar">

{/* LOGO */}

<div className="logo-section">
<img src="/image/logo.jpg" alt="logo" className="logo-img"/>
<h2 className="logo-title">neGbis</h2>
</div>


{/* DASHBOARD */}

<div
className="menu-item"
onClick={()=>navigate("/dashboard")}
>
<FaTachometerAlt className="menu-icon"/>
<span>Dashboard</span>
</div>


{/* REPORT */}

<div
className="menu-item"
onClick={()=>setReportOpen(!reportOpen)}
>
<FaChartPie className="menu-icon"/>

<span className="menu-text">Report</span>

{reportOpen
? <FaChevronDown className="arrow"/>
: <FaChevronRight className="arrow"/>}

</div>


{/* REPORT SUBMENU */}

{reportOpen && (

<div className="submenu">

<div
className="submenu-item"
onClick={()=>navigate("/sales")}
>
Sales
</div>

<div
className="submenu-item"
onClick={()=>navigate("/invoice")}
>
<FaFileInvoiceDollar className="submenu-icon"/>
Invoice
</div>

</div>

)}

</div>

);

}

export default Sidebar;