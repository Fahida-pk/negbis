import { useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar(){

const navigate = useNavigate();

return(

<div className="sidebar">

<h2 className="logo-title">neGbis</h2>

<div className="sidebar-menu">

<div
className="sidebar-item"
onClick={()=>navigate("/dashboard")}
>
Dashboard
</div>

<div className="sidebar-item">
Reports
</div>

<div
className="sidebar-subitem"
onClick={()=>navigate("/reports")}
>
Sales 
</div>
<div
className="sidebar-subitem"
onClick={()=>navigate("/reports")}
>
Invoice
</div>
</div>

</div>

);

}

export default Sidebar;