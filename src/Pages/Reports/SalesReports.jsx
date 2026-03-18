import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import "./reports.css";

function SalesReports(){

const [report,setReport] = useState("sale_summary")

const [fromDate,setFromDate] = useState("")
const [toDate,setToDate] = useState("")

const [opts,setOpts] = useState(0)
const [stype,setStype] = useState(0)
const [userCode,setUserCode] = useState("")
const [userName,setUserName] = useState("")
const [userList,setUserList] = useState([])
const [showUser,setShowUser] = useState(false)
const [data,setData] = useState([])

const [search,setSearch] = useState("")
const [customerCode,setCustomerCode] = useState("")
const [customerName,setCustomerName] = useState("")

const [customerList,setCustomerList] = useState([])
const [showCustomer,setShowCustomer] = useState(false)

const [showReport,setShowReport] = useState(false)
const [loading,setLoading] = useState(false)

const [stores,setStores] = useState([])
const [store,setStore] = useState(0)

const [billWise,setBillWise] = useState(true)

const [status,setStatus] = useState([])
const [user,setUser] = useState(0)
const [salesman,setSalesman] = useState(0)

/* LOAD STORES */

useEffect(()=>{

fetch(`/api/data?type=getStores`)
.then(res=>res.json())
.then(result=>{
if(result?.data){
setStores(result.data)
}
})
.catch(err=>console.log("Store Load Error:",err))

},[])

useEffect(()=>{
if(report === "daily_summary"){
setBillWise(true)
setStatus([])
}
},[report])
/* LOAD REPORT */

const handleLoad = async ()=>{

if(!fromDate || !toDate){
alert("Select date")
return
}

setLoading(true)

try{

let url = ""

if(report === "sale_summary"){

url =
`/api/data?type=salesSummary
&from=${fromDate}
&to=${toDate}
&store=${Number(store)||0}
&custid=${Number(customerCode)||0}
&opts=${opts}
&stype=${stype}
&status=${status.join(",")}
&user=${user}
&salesman=${salesman}`

}

else if(report === "daily_summary"){

url =
`/api/data?type=dailySalesSummary
&from=${fromDate}
&to=${toDate}
&store=${Number(store)||0}
&billWise=${billWise ? 1 : 0}`

}
else if(report === "monthly_summary"){

url =
`/api/data?type=monthly_Sales_Summary
&from=${fromDate}
&to=${toDate}
&store=${Number(store)||0}
&custid=${Number(customerCode)||0}
&opts=${opts}
&stype=${stype}
&status=${status.join(",")}
&user=${user}
&salesman=${salesman}`

}
console.log("API URL:",url)

const res = await fetch(url)
const result = await res.json()

if(result.status==="success"){
setData(result.data || [])
setShowReport(true)
}else{
alert(result.message || "Report failed")
}

}catch(err){
console.log("Fetch Error:",err)
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
setData([])
}
const selectUser = (u)=>{

setUserCode(u.CODE)
setUserName(u.DESCRIPTION)
setUser(u.CODE)

setShowUser(false)

}

/* CUSTOMER LOOKUP */

const openCustomer = async ()=>{

try{

const res = await fetch("/api/data?type=customerLookup")
const result = await res.json()

if(result?.data){
setCustomerList(result.data)
setShowCustomer(true)
}

}catch(err){
console.log("Customer Load Error:",err)
}

}

const selectCustomer = (c)=>{

setCustomerCode(c.CODE)
setCustomerName(c.DESCRIPTION)
setShowCustomer(false)

}
const openUser = async ()=>{

try{

const res = await fetch("/api/data?type=userLookup")
const result = await res.json()

if(result?.data){
setUserList(result.data)
setShowUser(true)
}

}catch(err){
console.log("User Load Error:",err)
}

}
const handleStatusChange = (value) => {

if(value === "all"){
if(status.length === 4){
setStatus([])
}else{
setStatus(["1","2","3","4"])
}
return
}

if(status.includes(value)){
setStatus(status.filter(s => s !== value))
}else{
setStatus([...status,value])
}

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
<label>
  <input
    type="radio"
    name="report"
    checked={report==="daily_summary"}
    onChange={()=>setReport("daily_summary")}
  />
  Daily Sales Summary
</label>
<label>
<input
type="radio"
name="report"
checked={report==="monthly_summary"}
onChange={()=>setReport("monthly_summary")}
/>
Monthly Sales Summary
</label><label><input type="radio" name="report"/>Sale Details</label>
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
<div className="radio-group">

<label>
<input type="radio" checked={opts===0} onChange={()=>setOpts(0)} />
All
</label>

<label>
<input type="radio" checked={opts===1} onChange={()=>setOpts(1)} />
Sales Invoice
</label>

<label>
<input type="radio" checked={opts===2} onChange={()=>setOpts(2)} />
Sales Return
</label>

</div>

{opts===1 && (

<div className="bill-type-row">    <label>
<input type="radio" checked={stype===0} onChange={()=>setStype(0)}/>
All
</label>

<label>
<input type="radio" checked={stype===1} onChange={()=>setStype(1)}/>
B2B
</label>

<label>
<input type="radio" checked={stype===2} onChange={()=>setStype(2)}/>
B2C
</label>

</div>

)}

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

<select
value={store}
onChange={(e)=>setStore(e.target.value)}
>

<option value={0}>All Stores</option>

{stores.map((s)=>(
<option key={s.ID} value={s.ID}>
{s.STORE_NAME}
</option>
))}

</select>

</div>

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
<div className="filter-row">
    <label>User</label>

<div className="customer-row">

<input value={userCode} placeholder="Code" readOnly/>

<input value={userName} placeholder="Description" readOnly/>

<button className="customer-btn" onClick={openUser}>
🔍
</button>

</div>

</div>
{/* USER LOOKUP */}

{showUser && (

<div className="lookup-overlay">

<div className="lookup-modal">

<div className="lookup-header">
<span>User Lookup</span>
<button onClick={()=>setShowUser(false)}>X</button>
</div>

<div className="lookup-search">

<input
placeholder="Find User"
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

{(userList || [])
.filter((u)=>
u.DESCRIPTION.toLowerCase().includes(search.toLowerCase()) ||
u.CODE.toString().includes(search)
)
.map((u,i)=>(

<tr key={i} onClick={()=>selectUser(u)}>
<td>{u.CODE}</td>
<td>{u.DESCRIPTION}</td>
</tr>

))}

</tbody>

</table>

</div>

<div className="lookup-footer">
<button onClick={()=>setShowUser(false)}>Cancel</button>
</div>

</div>

</div>

)}
{report !== "daily_summary" && (
<div className="bill-type-row">

<label>
<input
type="radio"
checked={billWise===true}
onChange={()=>setBillWise(true)}
/>
Bill wise
</label>

<label>
<input
type="radio"
checked={billWise===false}
onChange={()=>setBillWise(false)}
/>
Sale Type
</label>

</div>
)}

<div className="status-row">
<label>Status</label>

<label>
<input
type="checkbox"
checked={status.length === 4}
onChange={()=>handleStatusChange("all")}
/>
All
</label>

<label>
<input
type="checkbox"
checked={status.includes("1")}
onChange={()=>handleStatusChange("1")}
/>
Cancelled
</label>

<label>
<input
type="checkbox"
checked={status.includes("2")}
onChange={()=>handleStatusChange("2")}
/>
Open
</label>

<label>
<input
type="checkbox"
checked={status.includes("3")}
onChange={()=>handleStatusChange("3")}
/>
Partial
</label>

<label>
<input
type="checkbox"
checked={status.includes("4")}
onChange={()=>handleStatusChange("4")}
/>
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