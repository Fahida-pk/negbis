import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import "./reports.css";

function SalesReports(){

const [fromDate,setFromDate] = useState("")
const [toDate,setToDate] = useState("")

const [opts,setOpts] = useState(0)
const [stype,setStype] = useState(0)

const [data,setData] = useState([])

const [customerCode,setCustomerCode] = useState("")
const [customerName,setCustomerName] = useState("")

const [customerList,setCustomerList] = useState([])
const [showCustomer,setShowCustomer] = useState(false)

const [showReport,setShowReport] = useState(false)
const [loading,setLoading] = useState(false)

const [stores,setStores] = useState([])
const [store,setStore] = useState(0)

const [search,setSearch] = useState("")

/* LOAD STORES */

useEffect(()=>{

fetch("/api/data?type=getStores")
.then(res=>res.json())
.then(result=>{
if(result.data){
setStores(result.data)
}
})

},[])


/* LOAD REPORT */

const handleLoad = async ()=>{

if(!fromDate || !toDate){
alert("Select date")
return
}

setLoading(true)

const cust = customerCode ? customerCode : 0

try{

const res = await fetch(
`/api/data?from=${fromDate}&to=${toDate}&store=${store}&opts=${opts}&stype=${stype}&custid=${cust}`
)

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

<h3>Sales Invoice Reports</h3>

<div>

<label>From</label>

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


<div>

<label>Store</label>

<select
value={store}
onChange={(e)=>setStore(e.target.value)}
>

<option value="0">All Stores</option>

{stores.map((s)=>(
<option key={s.ID} value={s.ID}>
{s.STORE_NAME}
</option>
))}

</select>

</div>


<div>

<label>Customer</label>

<input value={customerCode} readOnly/>
<input value={customerName} readOnly/>

<button onClick={openCustomer}>
🔍
</button>

</div>


<div>

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


{/* REPORT POPUP */}

{showReport && (

<div className="report-modal">

<h3>Sales Summary</h3>

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

<button onClick={()=>setShowReport(false)}>
Close
</button>

</div>

)}


{/* CUSTOMER LOOKUP */}

{showCustomer && (

<div className="lookup-modal">

<h3>Customer Lookup</h3>

<input
placeholder="Search..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<table>

<thead>

<tr>
<th>Code</th>
<th>Description</th>
</tr>

</thead>

<tbody>

{customerList
.filter(c=>
c.DESCRIPTION.toLowerCase().includes(search.toLowerCase())
)
.map((c,i)=>(

<tr key={i} onClick={()=>selectCustomer(c)}>

<td>{c.CODE}</td>
<td>{c.DESCRIPTION}</td>

</tr>

))}

</tbody>

</table>

<button onClick={()=>setShowCustomer(false)}>
Close
</button>

</div>

)}

</div>

)

}

export default SalesReports