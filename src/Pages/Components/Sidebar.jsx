import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
FaHome,
FaFileAlt,
FaChartLine,
FaFileInvoiceDollar,
FaChevronDown
} from "react-icons/fa";

import "./sidebar.css";

function Sidebar(){

const navigate = useNavigate();

const [openMenu,setOpenMenu] = useState(null);

return(

<div className="sidebar">

{/* LOGO */}

<div className="logo-box">
<img src="/image/logo.jpg" alt="logo" className="logo-img"/>
<span className="logo-title">neGbis</span>
</div>


{/* DASHBOARD */}

<div
className="sidebar-item"
onClick={()=>navigate("/dashboard")}
>
<FaHome className="icon"/>
<span>Dashboard</span>
</div>


{/* REPORTS */}

<div
className="sidebar-item"
onClick={()=>setOpenMenu(openMenu === "reports" ? null : "reports")}
>
<FaFileAlt className="icon"/>
<span>Reports</span>

<FaChevronDown
className="arrow"
style={{
transform: openMenu === "reports" ? "rotate(180deg)" : "rotate(0deg)",
transition:"0.3s"
}}
/>

</div>


{/* SALES */}

{openMenu === "reports" && (

<div
className="sidebar-subitem"
onClick={()=>setOpenMenu(openMenu === "sales" ? null : "sales")}
>
<FaChartLine className="icon"/>
<span>Sales</span>

<FaChevronDown
className="arrow"
style={{
transform: openMenu === "sales" ? "rotate(180deg)" : "rotate(0deg)",
transition:"0.3s"
}}
/>

</div>

)}


{/* INVOICE */}

{openMenu === "sales" && (

<div
className="sidebar-subitem2"
onClick={()=>navigate("/invoice")}
>
<FaFileInvoiceDollar className="icon"/>
<span>Invoice</span>
</div>

)}

</div>

);

}

export default Sidebar;