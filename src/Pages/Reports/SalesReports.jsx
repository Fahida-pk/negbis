import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import "./reports.css";

function SalesReports(){

const [report,setReport] = useState("sale_summary")
const [fromDate,setFromDate] = useState("")
const [toDate,setToDate] = useState("")
const [data,setData] = useState([])
const [search,setSearch] = useState("")
const [customerCode,setCustomerCode] = useState("")
const [customerName,setCustomerName] = useState("")

const [customerList,setCustomerList] = useState([])
const [showCustomer,setShowCustomer] = useState(false)
const [showReport,setShowReport] = useState(false)

const [loading,setLoading] = useState(false)


/* LOAD REPORT */

const handlePrint = async ()=>{

if(!fromDate || !toDate){
alert("Select date")
return
}

setLoading(true)

try{

const res = await fetch("/api/salesSummary",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
from:fromDate,
to:toDate,
customer:customerCode
})
})

const result = await res.json()

if(result.status==="success"){
setData(result.data)
setShowReport(true)
}else{
alert("Report failed")
}

}catch(err){
console.log(err)
alert("Server error")
}

setLoading(false)

}


/* PRINT */

const printTable = ()=>{

const printContent = document.getElementById("reportTable").outerHTML

const win = window.open("","","width=900,height=700")

win.document.write(`
<html>
<head>
<title>Sales Report</title>

<style>
body{font-family:Arial;padding:20px;}
table{width:100%;border-collapse:collapse;}
th,td{border:1px solid #999;padding:8px;text-align:left;}
th{background:#eee;}
</style>

</head>

<body>

<h2>Sales Summary Report</h2>

${printContent}

<script>
window.print()
window.close()
</script>

</body>
</html>
`)

}


/* CLEAR */

const handleClear = ()=>{
setFromDate("")
setToDate("")
setCustomerCode("")
setCustomerName("")
setData([])
}


/* CUSTOMER LOOKUP */

const openCustomer = async ()=>{

const res = await fetch("/api/customerLookup")
const result = await res.json()

if(result.data){
setCustomerList(result.data)
setShowCustomer(true)
}

}

const selectCustomer = (c)=>{
setCustomerCode(c.CODE)
setCustomerName(c.DESCRIPTION)
setShowCustomer(false)
}


return(

<div className="report-container">

<Sidebar/>

<div className="report-box">

<div className="report-header">
<h3>Sales Invoice Reports</h3>
<button className="close-btn" onClick={()=>window.history.back()}>X</button>
</div>

<div className="report-content">


{/* LEFT PANEL */}

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

<label><input type="radio" name="report"/>Daily Sales Summary</label>
<label><input type="radio" name="report"/>Monthly Sales Summary</label>
<label><input type="radio" name="report"/>Sale Details</label>
<label><input type="radio" name="report"/>Item wise Sales</label>
<label><input type="radio" name="report"/>Item wise Profit</label>
<label><input type="radio" name="report"/>Item wise Summary</label>
<label><input type="radio" name="report"/>Salesman wise Sales</label>
<label><input type="radio" name="report"/>Daily Sales Report</label>
<label><input type="radio" name="report"/>Sales Profit</label>
<label><input type="radio" name="report"/>Sale Tax Summary</label>

</div>


{/* RIGHT PANEL */}

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


<div className="buttons">

<button className="print" onClick={handlePrint}>
{loading ? "Loading..." : "Load"}
</button>

<button className="print" onClick={printTable}>
Print
</button>

<button className="clear" onClick={handleClear}>
Clear
</button>

</div>

</div>

</div>

</div>


{/* REPORT POPUP */}

{showReport && (

<div className="report-overlay">

<div className="report-modal">

<div className="report-modal-header">
<h3>Sales Summary Report</h3>

<button onClick={()=>setShowReport(false)}>
✕
</button>

</div>


<div className="report-modal-body">

<table className="report-table" id="reportTable">

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

{data.map((row,i)=>(
<tr key={i}>
<td>{row.SALE_NO}</td>
<td>{row.SALE_DATE}</td>
<td>{row.NET_AMOUNT}</td>
<td>{row.GROSS_AMOUNT}</td>
<td>{row.CUST_NAME}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

</div>

)}


{/* CUSTOMER LOOKUP */}

{showCustomer && (

<div className="lookup-overlay">

<div className="lookup-modal">

<div className="lookup-header">
<span>Customer Lookup</span>
<button onClick={()=>setShowCustomer(false)}>X</button>
</div>

<div className="lookup-search">

<input
placeholder="Find Code or Description"
value={search}
onChange={(e)=>setSearch(e.target.value)}
autoFocus
/>

</div>

<div className="lookup-table">

<table>

<thead>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
</thead>

<tbody>

{customerList
.filter((c)=>
c.DESCRIPTION.toLowerCase().includes(search.toLowerCase()) ||
c.CODE.toString().includes(search)
)
.map((c,i)=>(

<tr key={i} onClick={()=>selectCustomer(c)}>
<td>{c.CODE}</td>
<td>{c.DESCRIPTION}</td>
</tr>

))}

</tbody>

</table>

</div>

<div className="lookup-footer">
<button onClick={()=>setShowCustomer(false)}>Cancel</button>
</div>

</div>

</div>

)}

</div>

)

}

export default SalesReports