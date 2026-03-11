import { useState } from "react";
import "./reports.css";

function SalesReports() {

const [report,setReport] = useState("sale_summary");
const [fromDate,setFromDate] = useState("");
const [toDate,setToDate] = useState("");
const [data,setData] = useState([]);

const [showCustomer,setShowCustomer] = useState(false);
const [customerList,setCustomerList] = useState([]);

const [showSalesman,setShowSalesman] = useState(false);
const [salesmanList,setSalesmanList] = useState([]);

const [customerCode,setCustomerCode] = useState("");
const [customerName,setCustomerName] = useState("");

const [salesmanCode,setSalesmanCode] = useState("");
const [salesmanName,setSalesmanName] = useState("");


/* PRINT REPORT */

const handlePrint = async ()=>{

let api="";

if(report==="sale_summary") api="/api/salesSummary";
if(report==="daily_sales_summary") api="/api/dailySalesSummary";
if(report==="monthly_sales_summary") api="/api/monthlySalesSummary";
if(report==="sale_details") api="/api/saleDetails";
if(report==="itemwise_sales") api="/api/itemwiseSales";
if(report==="itemwise_profit") api="/api/itemwiseProfit";
if(report==="itemwise_summary") api="/api/itemwiseSummary";
if(report==="salesman_sales") api="/api/salesmanSales";
if(report==="daily_sales_report") api="/api/dailySalesReport";
if(report==="sales_profit") api="/api/salesProfit";
if(report==="sales_tax_summary") api="/api/salesTaxSummary";

try{

const res = await fetch(api,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
from:fromDate,
to:toDate
})
});

const result = await res.json();

if(result.data){
setData(result.data);
}

}catch(err){
console.log(err);
}

};


/* CLEAR */

const handleClear = ()=>{
setFromDate("");
setToDate("");
setData([]);
};


/* CLOSE */

const handleClose = ()=>{
window.history.back();
};


/* CUSTOMER LOOKUP */

const openCustomer = async ()=>{

const res = await fetch("/api/customerLookup");
const result = await res.json();

if(result.data){
setCustomerList(result.data);
setShowCustomer(true);
}

};

const selectCustomer = (c)=>{
setCustomerCode(c.CODE);
setCustomerName(c.NAME);
setShowCustomer(false);
};


/* SALESMAN LOOKUP */

const openSalesman = async ()=>{

const res = await fetch("/api/salesmanLookup");
const result = await res.json();

if(result.data){
setSalesmanList(result.data);
setShowSalesman(true);
}

};

const selectSalesman = (s)=>{
setSalesmanCode(s.CODE);
setSalesmanName(s.NAME);
setShowSalesman(false);
};


return(

<div className="report-container">

<div className="report-box">

<h3>Sales Invoice Reports</h3>

<div className="report-content">

{/* LEFT */}

<div className="report-left">

<label>
<input type="radio"
checked={report==="sale_summary"}
onChange={()=>setReport("sale_summary")}
name="report"
/>
Sale Summary
</label>

<label>
<input type="radio"
name="report"
onChange={()=>setReport("daily_sales_summary")}
/>
Daily Sales Summary
</label>

<label>
<input type="radio"
name="report"
onChange={()=>setReport("monthly_sales_summary")}
/>
Monthly Sales Summary
</label>

<label>
<input type="radio"
name="report"
onChange={()=>setReport("sale_details")}
/>
Sale Details
</label>

<label>
<input type="radio"
name="report"
onChange={()=>setReport("itemwise_sales")}
/>
Item wise Sales
</label>

<label>
<input type="radio"
name="report"
onChange={()=>setReport("itemwise_profit")}
/>
Item wise Profit
</label>

<label>
<input type="radio"
name="report"
onChange={()=>setReport("itemwise_summary")}
/>
Item wise Summary
</label>

<label>
<input type="radio"
name="report"
onChange={()=>setReport("salesman_sales")}
/>
Salesman wise Sales
</label>

<label>
<input type="radio"
name="report"
onChange={()=>setReport("daily_sales_report")}
/>
Daily Sales Report
</label>

<label>
<input type="radio"
name="report"
onChange={()=>setReport("sales_profit")}
/>
Sales Profit
</label>

<label>
<input type="radio"
name="report"
onChange={()=>setReport("sales_tax_summary")}
/>
Sale Tax Summary
</label>

</div>


{/* RIGHT */}

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

<input value={customerCode} placeholder="Code" readOnly/>

<input value={customerName} placeholder="Description" readOnly/>

<button onClick={openCustomer}>🔍</button>

</div>


<div className="filter-row">

<label>Salesman</label>

<input value={salesmanCode} placeholder="Code" readOnly/>

<input value={salesmanName} placeholder="Description" readOnly/>

<button onClick={openSalesman}>🔍</button>

</div>


<div className="buttons">

<button className="print" onClick={handlePrint}>
Print
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

{data.length>0 && (

<table className="report-table">

<thead>

<tr>
{Object.keys(data[0]).map((key)=>(
<th key={key}>{key}</th>
))}
</tr>

</thead>

<tbody>

{data.map((row,i)=>(
<tr key={i}>
{Object.values(row).map((val,j)=>(
<td key={j}>{val}</td>
))}
</tr>
))}

</tbody>

</table>

)}


{/* CUSTOMER LOOKUP */}

{showCustomer && (

<div className="lookup">

<h3>Customer Lookup</h3>

<table>

<thead>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
</thead>

<tbody>

{customerList.map((c,i)=>(
<tr key={i} onClick={()=>selectCustomer(c)}>
<td>{c.CODE}</td>
<td>{c.NAME}</td>
</tr>
))}

</tbody>

</table>

<button onClick={()=>setShowCustomer(false)}>
Close
</button>

</div>

)}


{/* SALESMAN LOOKUP */}

{showSalesman && (

<div className="lookup">

<h3>Salesman Lookup</h3>

<table>

<thead>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
</thead>

<tbody>

{salesmanList.map((s,i)=>(
<tr key={i} onClick={()=>selectSalesman(s)}>
<td>{s.CODE}</td>
<td>{s.NAME}</td>
</tr>
))}

</tbody>

</table>

<button onClick={()=>setShowSalesman(false)}>
Close
</button>

</div>

)}

</div>

</div>

);

}

export default SalesReports;