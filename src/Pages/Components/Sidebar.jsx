import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
FaHome,
FaFileAlt,
FaChartLine,
FaFileInvoiceDollar,
FaChevronDown,
FaChevronRight
} from "react-icons/fa";

import "./sidebar.css";

function Sidebar(){

const navigate = useNavigate();

const [showReports,setShowReports] = useState(false);
const [showSales,setShowSales] = useState(false);

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


{/* REPORT */}

<div
className="sidebar-item"
onClick={()=>setShowReports(!showReports)}
>
<FaFileAlt className="icon"/>
<span>Reports</span>

{showReports ? <FaChevronDown/> : <FaChevronRight/>}

</div>


{/* SALES */}

{showReports && (

<div
className="sidebar-subitem"
onClick={()=>setShowSales(!showSales)}
>
<FaChartLine className="icon"/>
<span>Sales</span>

{showSales ? <FaChevronDown/> : <FaChevronRight/>}

</div>

)}


{/* INVOICE */}

{showSales && (

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