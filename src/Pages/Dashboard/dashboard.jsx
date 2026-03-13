import Sidebar from "../Components/Sidebar";
import "./dashboard.css";

function Dashboard(){

return(

<div className="dashboard-layout">

<Sidebar/>

<div className="dashboard-main">

{/* CONTENT AREA */}

<div className="content-area">
</div>


{/* BOTTOM BAR */}

<div className="bottom-bar">

<div>
<img src="/image/logo.webp" className="logo"/>
</div>

<div className="contact-info">

<p className="contact-number">
+91 88484 18551
</p>

<p className="contact-mail">
contact@codezyntax.com
</p>

</div>

<div>

<h1 className="erp-title">
neGbis ERP v8.0.6
</h1>

</div>

</div>

</div>

</div>

);

}

export default Dashboard;