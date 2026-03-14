import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import "./reports.css";

function SalesReports(){

const [report,setReport] = useState("sale_summary")

const [fromDate,setFromDate] = useState("")
const [toDate,setToDate] = useState("")

const [opts,setOpts] = useState(0)
const [stype,setStype] = useState(0)

const [billWise,setBillWise] = useState(true)

const [data,setData] = useState([])

const [search,setSearch] = useState("")
const [customerCode,setCustomerCode] = useState("")
const [customerName,setCustomerName] = useState("")

const [userCode,setUserCode] = useState("")
const [userName,setUserName] = useState("")

const [status,setStatus] = useState({
all:false,
cancelled:false,
open:false,
partial:false,
paid:false
})

const [customerList,setCustomerList] = useState([])
const [showCustomer,setShowCustomer] = useState(false)

const [showReport,setShowReport] = useState(false)
const [loading,setLoading] = useState(false)

const [stores,setStores] = useState([])
const [store,setStore] = useState("")

useEffect(()=>{

fetch(`/api/data?type=getStores`)
.then(res=>res.json())
.then(data=>{
setStores(data.data)
})

},[])

/* LOAD REPORT */

const handleLoad = async ()=>{

if(!fromDate || !toDate){
alert("Select date")
return
}

setLoading(true)

const statusParam = Object.keys(status)
.filter(k=>status[k])
.join(",")

try{

const res = await fetch(`/api/data?type=salesSummary
&from=${fromDate}
&to=${toDate}
&store=${store}
&opts=${opts}
&stype=${stype}
&user=${userCode}
&status=${statusParam}
&billwise=${billWise?1:0}`)

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

const printTable = () => {

if(data.length === 0){
alert("No data to print")
return
}

const win = window.open("","","width=900,height=700")

const rows = data.map(row => `
<tr>
<td>${row.SALE_NO}</td>
<td>${row.SALE_DATE}</td>
<td>${row.STORE_NAME || ""}</td>
<td>${row.USER_NAME || ""}</td>
<td>${row.NET_AMOUNT}</td>
<td>${row.GROSS_AMOUNT}</td>
<td>${row.CUST_NAME}</td>
</tr>
`).join("")

win.document.write(`
<html>
<head>
<title>Sales Report</title>

<style>
body{
font-family:Arial;
padding:20px;
}

table{
width:100%;
border-collapse:collapse;
}

th,td{
border:1px solid #999;
padding:8px;
text-align:left;
}

th{
background:#eee;
}

h2{
margin-bottom:10px;
}
</style>

</head>

<body>

<h2>Sales Summary Report</h2>
<p>From: ${fromDate} To: ${toDate}</p>

<table>
<thead>
<tr>
<th>SALE NO</th>
<th>DATE</th>
<th>STORE</th>
<th>USER</th>
<th>NET</th>
<th>GROSS</th>
<th>CUSTOMER</th>
</tr>
</thead>

<tbody>
${rows}
</tbody>

</table>

</body>
</html>
`)

win.document.close()
win.print()

}

/* CLEAR */

const handleClear = ()=>{
setFromDate("")
setToDate("")
setCustomerCode("")
setCustomerName("")
setUserCode("")
setUserName("")
setData([])
}

/* CUSTOMER LOOKUP */

const openCustomer = async ()=>{

const res = await fetch("/api/data?type=customerLookup")
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

{/* SALES TYPE */}

<div className="filter-row">

<label>
<input type="radio" checked={opts===0} onChange={()=>setOpts(0)}/>
All
</label>

<label>
<input type="radio" checked={opts===1} onChange={()=>setOpts(1)}/>
Sales Invoice
</label>

<label>
<input type="radio" checked={opts===2} onChange={()=>setOpts(2)}/>
Sales Return
</label>

</div>

{/* BILL WISE */}

<div className="filter-row">

<label>
<input type="radio" checked={billWise} onChange={()=>setBillWise(true)}/>
Bill Wise
</label>

<label>
<input type="radio" checked={!billWise} onChange={()=>setBillWise(false)}/>
Sale Type
</label>

</div>

{/* DATE */}

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

{/* STORE */}

<div className="filter-row">

<label>Store</label>

<select
value={store}
onChange={(e)=>setStore(e.target.value)}
>

<option value="">Select Store</option>

{stores.map((s)=>(
<option key={s.ID} value={s.ID}>
{s.STORE_NAME}
</option>
))}

</select>

</div>

{/* CUSTOMER */}

<div className="filter-row">

<label>Customer</label>

<div className="customer-row">

<input value={customerCode} placeholder="Code" readOnly/>
<input value={customerName} placeholder="Description" readOnly/>

<button className="customer-btn" onClick={openCustomer}>
🔍
</button>

</div>

</div>

{/* USER */}

<div className="filter-row">

<label>User</label>

<input
value={userCode}
placeholder="Code"
onChange={(e)=>setUserCode(e.target.value)}
/>

<input
value={userName}
placeholder="Description"
onChange={(e)=>setUserName(e.target.value)}
/>

</div>

{/* STATUS */}

<div className="filter-row">

<label>Status</label>

<label>
<input type="checkbox"
checked={status.all}
onChange={()=>setStatus({...status,all:!status.all})}/>
All
</label>

<label>
<input type="checkbox"
checked={status.cancelled}
onChange={()=>setStatus({...status,cancelled:!status.cancelled})}/>
Cancelled
</label>

<label>
<input type="checkbox"
checked={status.open}
onChange={()=>setStatus({...status,open:!status.open})}/>
Open
</label>

<label>
<input type="checkbox"
checked={status.partial}
onChange={()=>setStatus({...status,partial:!status.partial})}/>
Partial
</label>

<label>
<input type="checkbox"
checked={status.paid}
onChange={()=>setStatus({...status,paid:!status.paid})}/>
Paid
</label>

</div>

<div className="buttons">

<button className="print" onClick={handleLoad}>
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
<button onClick={()=>setShowReport(false)}>✕</button>
</div>

<div className="report-modal-body">

<table className="report-table">

<thead>
<tr>
<th>SALE NO</th>
<th>DATE</th>
<th>STORE</th>
<th>USER</th>
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
<td>{row.STORE_NAME}</td>
<td>{row.USER_NAME}</td>
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

</div>

)

}

export default SalesReports