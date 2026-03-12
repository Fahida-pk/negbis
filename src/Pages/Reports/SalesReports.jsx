import { useState } from "react";
import "./reports.css";

function SalesReports() {

const [report,setReport] = useState("sale_summary");
const [fromDate,setFromDate] = useState("");
const [toDate,setToDate] = useState("");
const [data,setData] = useState([]);

const [customerCode,setCustomerCode] = useState("");
const [customerName,setCustomerName] = useState("");

const [salesmanCode,setSalesmanCode] = useState("");
const [salesmanName,setSalesmanName] = useState("");

const [loading,setLoading] = useState(false);


/* PRINT REPORT */

const handlePrint = async () => {

if(!fromDate || !toDate){
alert("Please select date range");
return;
}

setLoading(true);

try{

const res = await fetch("/api/salesSummary",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
from:fromDate,
to:toDate
})
});

const result = await res.json();

if(result.status === "success"){
setData(result.data);
}else{
alert(result.message || "Report loading failed");
}

}catch(error){

console.log(error);
alert("Server error");

}

setLoading(false);

};


/* CLEAR */

const handleClear = () => {

setFromDate("");
setToDate("");

setCustomerCode("");
setCustomerName("");

setSalesmanCode("");
setSalesmanName("");

setData([]);

};


/* CLOSE */

const handleClose = () => {
window.history.back();
};


return(

<div className="report-container">

<div className="report-box">

<h3>Sales Invoice Reports</h3>

<div className="report-content">

{/* LEFT MENU */}

<div className="report-left">

<label>
<input
type="radio"
checked={report==="sale_summary"}
onChange={()=>setReport("sale_summary")}
name="report"
/>
Sale Summary
</label>

<label>
<input type="radio" name="report"
onChange={()=>setReport("daily_sales_summary")}
/>
Daily Sales Summary
</label>

<label>
<input type="radio" name="report"
onChange={()=>setReport("monthly_sales_summary")}
/>
Monthly Sales Summary
</label>

<label>
<input type="radio" name="report"
onChange={()=>setReport("sale_details")}
/>
Sale Details
</label>

<label>
<input type="radio" name="report"
onChange={()=>setReport("itemwise_sales")}
/>
Item wise Sales
</label>

<label>
<input type="radio" name="report"
onChange={()=>setReport("itemwise_profit")}
/>
Item wise Profit
</label>

<label>
<input type="radio" name="report"
onChange={()=>setReport("itemwise_summary")}
/>
Item wise Summary
</label>

<label>
<input type="radio" name="report"
onChange={()=>setReport("salesman_sales")}
/>
Salesman wise Sales
</label>

<label>
<input type="radio" name="report"
onChange={()=>setReport("daily_sales_report")}
/>
Daily Sales Report
</label>

<label>
<input type="radio" name="report"
onChange={()=>setReport("sales_profit")}
/>
Sales Profit
</label>

<label>
<input type="radio" name="report"
onChange={()=>setReport("sales_tax_summary")}
/>
Sale Tax Summary
</label>

</div>


{/* RIGHT SIDE */}

<div className="report-right">

<div className="filter-row">

<label>Date From</label>

<input
type="date"
value={fromDate}
onChange={(e)=>setFromDate(e.target.value)}
/>

<label>To</label>

<input
type="date"
value={toDate}
onChange={(e)=>setToDate(e.target.value)}
/>

</div>


<div className="filter-row">

<label>Store</label>

<input placeholder="DEFAULT STORE"/>

</div>


<div className="filter-row">

<label>Customer</label>

<input
value={customerCode}
placeholder="Code"
readOnly
/>

<input
value={customerName}
placeholder="Description"
readOnly
/>

<button type="button">🔍</button>

</div>


<div className="filter-row">

<label>Salesman</label>

<input
value={salesmanCode}
placeholder="Code"
readOnly
/>

<input
value={salesmanName}
placeholder="Description"
readOnly
/>

<button type="button">🔍</button>

</div>


<div className="buttons">

<button className="print" onClick={handlePrint}>
{loading ? "Loading..." : "Print"}
</button>

<button className="clear" onClick={handleClear}>
Clear
</button>

<button className="close" onClick={handleClose}>
Close
</button>

</div>

</div>

</div>


{/* REPORT TABLE */}

{data.length>0 &&(

<table className="report-table">

<thead>

<tr>
<th>SALE NO</th>
<th>DATE</th>
<th>NET</th>
<th>GROSS</th>
<th>CUSTOMER</th>
</tr>

</thead>

<tbody>

{data.map((row,index)=>(

<tr key={index}>

<td>{row.SALE_NO}</td>
<td>{row.SALE_DATE}</td>
<td>{row.NET_AMOUNT}</td>
<td>{row.GROSS_AMOUNT}</td>
<td>{row.CUST_NAME}</td>

</tr>

))}

</tbody>

</table>

)}

</div>

</div>

);

}

export default SalesReports;