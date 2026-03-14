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

const [customerList,setCustomerList] = useState([])
const [userList,setUserList] = useState([])

const [showCustomer,setShowCustomer] = useState(false)
const [showUser,setShowUser] = useState(false)

const [showReport,setShowReport] = useState(false)
const [loading,setLoading] = useState(false)

const [stores,setStores] = useState([])
const [store,setStore] = useState("")

const [status,setStatus] = useState({
all:false,
cancelled:false,
open:false,
partial:false,
paid:false
})

useEffect(()=>{

fetch(`/api/data?type=getStores`)
.then(res=>res.json())
.then(data=>{
setStores(data.data)
})

},[])


/* =====================
LOAD REPORT
===================== */

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


/* =====================
PRINT
===================== */

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

<style>
body{font-family:Arial;padding:20px}
table{width:100%;border-collapse:collapse}
th,td{border:1px solid #999;padding:8px}
th{background:#eee}
</style>

</head>

<body>

<h2>Sales Summary Report</h2>
<p>${fromDate} To ${toDate}</p>

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


/* =====================
CLEAR
===================== */

const handleClear = ()=>{
setFromDate("")
setToDate("")
setCustomerCode("")
setCustomerName("")
setUserCode("")
setUserName("")
setData([])
}


/* =====================
CUSTOMER LOOKUP
===================== */

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


/* =====================
USER LOOKUP
===================== */

const openUser = async ()=>{

const res = await fetch("/api/data?type=userLookup")

const result = await res.json()

if(result.data){
setUserList(result.data)
setShowUser(true)
}

}

const selectUser = (u)=>{
setUserCode(u.CODE)
setUserName(u.DESCRIPTION)
setShowUser(false)
}


/* =====================
UI
===================== */

return(

<div className="report-container">

<Sidebar/>

<div className="report-box">

<div className="report-header">
<h3>Sales Invoice Reports</h3>
<button className="close-btn">X</button>
</div>


<div className="report-content">


{/* LEFT PANEL */}

<div className="report-left">

<label>
<input type="radio" checked={report==="sale_summary"} onChange={()=>setReport("sale_summary")}/>
Sale Summary
</label>

<label><input type="radio"/>Daily Sales Summary</label>
<label><input type="radio"/>Monthly Sales Summary</label>

</div>


{/* RIGHT PANEL */}

<div className="report-right">


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

<select value={store} onChange={(e)=>setStore(e.target.value)}>

<option value="">Select Store</option>

{stores.map((s)=>(
<option key={s.ID} value={s.ID}>{s.STORE_NAME}</option>
))}

</select>

</div>


{/* CUSTOMER */}

<div className="filter-row">

<label>Customer</label>

<div className="customer-row">

<input value={customerCode} placeholder="Code" readOnly/>

<input value={customerName} placeholder="Description" readOnly/>

<button onClick={openCustomer}>🔍</button>

</div>

</div>


{/* USER */}

<div className="filter-row">

<label>User</label>

<div className="customer-row">

<input value={userCode} placeholder="Code" readOnly/>

<input value={userName} placeholder="Description" readOnly/>

<button onClick={openUser}>🔍</button>

</div>

</div>


<div className="buttons">

<button onClick={handleLoad}>
{loading ? "Loading..." : "Load"}
</button>

<button onClick={printTable}>
Print
</button>

<button onClick={handleClear}>
Clear
</button>

</div>

</div>

</div>

</div>



{/* =====================
CUSTOMER LOOKUP MODAL
===================== */}

{showCustomer && (

<div className="lookup-overlay">

<div className="lookup-modal">

<h3>Customer Lookup</h3>

<input
placeholder="Search"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<table>

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

</div>

)}



{/* =====================
USER LOOKUP MODAL
===================== */}

{showUser && (

<div className="lookup-overlay">

<div className="lookup-modal">

<h3>User Lookup</h3>

<input
placeholder="Search"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<table>

<tbody>

{userList
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

</div>

)}


</div>

)

}

export default SalesReports