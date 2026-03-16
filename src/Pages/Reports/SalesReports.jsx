import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import "./reports.css";

function SalesReports(){

const [report,setReport] = useState("sale_summary")

const [fromDate,setFromDate] = useState("")
const [toDate,setToDate] = useState("")

const [opts,setOpts] = useState(0)
const [stype,setStype] = useState(0)

const [data,setData] = useState([])

const [search,setSearch] = useState("")

/* CUSTOMER */

const [customerCode,setCustomerCode] = useState("")
const [customerName,setCustomerName] = useState("")
const [customerList,setCustomerList] = useState([])
const [showCustomer,setShowCustomer] = useState(false)

/* USER */

const [userCode,setUserCode] = useState("")
const [userName,setUserName] = useState("")
const [userList,setUserList] = useState([])
const [showUser,setShowUser] = useState(false)

const [showReport,setShowReport] = useState(false)
const [loading,setLoading] = useState(false)

const [stores,setStores] = useState([])
const [store,setStore] = useState(0)

const [billWise,setBillWise] = useState(true)

const [status,setStatus] = useState("")
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

},[])


/* LOAD REPORT */

const handleLoad = async ()=>{

if(!fromDate || !toDate){
alert("Select date")
return
}

setLoading(true)

const url =
`/api/data?type=salesSummary
&from=${fromDate}
&to=${toDate}
&store=${Number(store)||0}
&custid=${Number(customerCode)||0}
&opts=${opts}
&stype=${stype}
&status=${status}
&user=${Number(userCode)||0}
&salesman=${salesman}`

const res = await fetch(url)
const result = await res.json()

if(result.status==="success"){

setData(result.data || [])
setShowReport(true)

}else{

alert("Report failed")

}

setLoading(false)

}


/* PRINT */

const printTable = () => {

if(data.length === 0){
alert("No data")
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
<body>

<h2>Sales Summary Report</h2>

<table border="1" width="100%">
<tr>
<th>SALE NO</th>
<th>DATE</th>
<th>NET</th>
<th>GROSS</th>
<th>CUSTOMER</th>
</tr>

${rows}

</table>

</body>
</html>
`)

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
}


/* CUSTOMER LOOKUP */

const openCustomer = async ()=>{

const res = await fetch("/api/data?type=customerLookup")
const result = await res.json()

setCustomerList(result.data)
setShowCustomer(true)

}

const selectCustomer = (c)=>{

setCustomerCode(c.CODE)
setCustomerName(c.DESCRIPTION)
setShowCustomer(false)

}


/* USER LOOKUP */

const openUser = async ()=>{

const res = await fetch("/api/data?type=userLookup")
const result = await res.json()

setUserList(result.data)
setShowUser(true)

}

const selectUser = (u)=>{

setUserCode(u.CODE)
setUserName(u.DESCRIPTION)
setShowUser(false)

}


return(

<div className="report-container">

<Sidebar/>

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

<label><input type="radio"/>Daily Sales Summary</label>
<label><input type="radio"/>Monthly Sales Summary</label>
<label><input type="radio"/>Sale Details</label>
<label><input type="radio"/>Item wise Sales</label>
<label><input type="radio"/>Item wise Profit</label>
<label><input type="radio"/>Item wise Summary</label>
<label><input type="radio"/>Salesman wise Sales</label>
<label><input type="radio"/>Daily Sales Report</label>
<label><input type="radio"/>Sales Profit</label>
<label><input type="radio"/>Sale Tax Summary</label>

</div>


{/* RIGHT */}

<div className="report-right">

{/* OPTIONS */}

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

{/* SALE TYPE */}

{opts===1 && (

<div className="filter-row">

<label><input type="radio" checked={stype===0} onChange={()=>setStype(0)}/>All</label>
<label><input type="radio" checked={stype===1} onChange={()=>setStype(1)}/>B2B</label>
<label><input type="radio" checked={stype===2} onChange={()=>setStype(2)}/>B2C</label>

</div>

)}

{/* DATE */}

<div className="filter-row">

<label>Date From</label>
<input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)}/>

<label>To</label>
<input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)}/>

</div>

{/* STORE */}

<div className="filter-row">

<label>Store</label>

<select value={store} onChange={(e)=>setStore(e.target.value)}>

<option value={0}>All Stores</option>

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


{/* STATUS */}

<div className="filter-row">

<label>Status</label>

<label><input type="checkbox" onChange={(e)=>setStatus(e.target.checked ? "1" : "")}/>Cancelled</label>
<label><input type="checkbox" onChange={(e)=>setStatus(e.target.checked ? "2" : "")}/>Open</label>
<label><input type="checkbox" onChange={(e)=>setStatus(e.target.checked ? "3" : "")}/>Partial</label>
<label><input type="checkbox" onChange={(e)=>setStatus(e.target.checked ? "4" : "")}/>Paid</label>

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


{/* REPORT POPUP */}

{showReport && (

<div className="report-overlay">

<div className="report-modal">

<h3>Sales Summary Report</h3>

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

</div>

</div>

)}


{/* CUSTOMER LOOKUP */}

{showCustomer && (

<div className="lookup-overlay">

<div className="lookup-modal">

<input
placeholder="Search"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<table>

<tbody>

{customerList
.filter(c =>
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


{/* USER LOOKUP */}

{showUser && (

<div className="lookup-overlay">

<div className="lookup-modal">

<input
placeholder="Search"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<table>

<tbody>

{userList
.filter(u =>
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