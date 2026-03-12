import Sidebar from "../Components/Sidebar";
import "./dashboard.css";

function Dashboard(){

return(

<div className="dashboard-layout">

<Sidebar/>

<div className="dashboard-main">

{/* CONTENT AREA */}

<div className="content-area">

<h1>Dashboard</h1>

</div>


{/* BOTTOM BAR */}

<div className="bottom-bar">

<div>
<img src="/image/logo.webp" className="logo"/>
</div>

<div style={{textAlign:"center"}}>

<p style={{margin:0,fontSize:"20px"}}>
+91 88484 18551
</p>

<p style={{margin:0,fontSize:"20px"}}>
contact@codezyntax.com
</p>

</div>

<div>

<h1 style={{margin:0,fontSize:"36px"}}>
neGbis ERP v8.0.6
</h1>

</div>

</div>

</div>

</div>

);

}

export default Dashboard;