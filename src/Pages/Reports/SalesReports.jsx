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
const [company, setCompany] = useState("")
const [search,setSearch] = useState("")
const [customerCode,setCustomerCode] = useState("")
const [customerName,setCustomerName] = useState("")
const [salesmanCode,setSalesmanCode] = useState("")
const [salesmanName,setSalesmanName] = useState("")
const [salesmanList,setSalesmanList] = useState([])
const [showSalesman,setShowSalesman] = useState(false)
const [customerList,setCustomerList] = useState([])
const [showCustomer,setShowCustomer] = useState(false)
const [divisionCode,setDivisionCode] = useState("")
const [divisionName,setDivisionName] = useState("")
const [categoryCode,setCategoryCode] = useState("")
const [categoryName,setCategoryName] = useState("")
const [brandCode,setBrandCode] = useState("")
const [brandName,setBrandName] = useState("")
const [itemCode,setItemCode] = useState("")
const [itemName,setItemName] = useState("")

const [divisionList,setDivisionList] = useState([])
const [categoryList,setCategoryList] = useState([])
const [brandList,setBrandList] = useState([])
const [itemList,setItemList] = useState([])

const [showDivision,setShowDivision] = useState(false)
const [showCategory,setShowCategory] = useState(false)
const [showBrand,setShowBrand] = useState(false)
const [showItem,setShowItem] = useState(false)
const [showReport,setShowReport] = useState(false)
const [loading,setLoading] = useState(false)

const [stores,setStores] = useState([])
const [store,setStore] = useState(0)

const [billWise,setBillWise] = useState(true)

const [status,setStatus] = useState([])
const [user,setUser] = useState(0)
const [salesman,setSalesman] = useState(0)
const firstSaleNo = data[0]?.SALE_NO

const filteredData = data.filter(
  row => row.SALE_NO === firstSaleNo
)
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
useEffect(()=>{
  if(status.length === 0){
    setStatus(["1","2","3","4"])
  }
},[])
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
&user=${user}`

}

else if(report === "daily_summary"){

url =
`/api/data?type=dailySalesSummary
&from=${fromDate}
&to=${toDate}
&store=${Number(store)||0}
&custid=${Number(customerCode)||0}
&status=${status.join(",")}`
}
else if(report === "monthly_summary"){

url =
`/api/data?type=monthlySalesSummary
&from=${fromDate}
&to=${toDate}
&store=${Number(store)||0}
&custid=${Number(customerCode)||0}
&opts=${opts}
&stype=${stype}
&status=${status.length ? status.join(",") : "1,2,3,4"}
&user=${user}`
}
else if(report === "sales_details"){

let params = `type=salesDetails
&from=${fromDate}
&to=${toDate}
&store=${Number(store)||0}`

if(Number(customerCode) > 0){
  params += `&custid=${Number(customerCode)}`
}

if(Number(salesman) > 0){
  params += `&salesman=${Number(salesman)}`
}

if(Number(user) > 0){
  params += `&user=${Number(user)}`
}

url = `/api/data?${params}`
}
else if(report === "itemwise_sales"){

url =
`/api/data?type=itemwiseSales
&from=${fromDate}
&to=${toDate}
&store=${Number(store)||0}
&custid=${Number(customerCode)||0}
&status=${status.length ? status.join(",") : "1,2,3,4"}
&salesman=${salesman}
&division=${divisionCode || 0}
&category=${categoryCode || 0}
&brand=${brandCode || 0}`

}
console.log("API URL:",url)

const res = await fetch(url)
const result = await res.json()

console.log("API RESULT:", result)   // 👈 ADD THIS

if(result.status==="success"){
setData(Array.isArray(result.data) ? result.data : [])
  setCompany(result.company || "")   // ✅ ADD THIS

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
const openSalesman = async ()=>{

  try{

    const res = await fetch("/api/data?type=salesmanLookup")
    const result = await res.json()

    if(result?.data){
      setSalesmanList(result.data)
      setShowSalesman(true)
    }

  }catch(err){
    console.log("Salesman Load Error:",err)
  }

}
const selectSalesman = (s)=>{

  setSalesmanCode(s.CODE)
  setSalesmanName(s.DESCRIPTION)
  setSalesman(s.CODE)

  setShowSalesman(false)

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
const selectDivision = (d) => {
setDivisionCode(d.ID)  
  setDivisionName(d.DESCRIPTION)

  // 🔥 IMPORTANT RESET
  setCategoryCode("")
  setCategoryName("")
  setBrandCode("")
  setBrandName("")
  setItemCode("")
  setItemName("")

  setShowDivision(false)
}
// ✅ OUTSIDE (top-level)

const selectCategory = (c) => {
setCategoryCode(c.ID)
  setCategoryName(c.DESCRIPTION)
  setShowCategory(false)
}

const selectBrand = (b) => {
setBrandCode(b.ID)
  setBrandName(b.DESCRIPTION)
  setShowBrand(false)
}

const selectItem = (i) => {
setItemCode(i.ID)
  setItemName(i.DESCRIPTION)
  setShowItem(false)
}
const openDivision = async ()=>{
  const res = await fetch("/api/data?type=divisionLookup")
  const result = await res.json()
  setDivisionList(result.data || [])
  setShowDivision(true)
}

const openCategory = async ()=>{
  console.log("DIVISION CODE:", divisionCode)   // 👈 ADD THIS

  const res = await fetch(`/api/data?type=categoryLookup&division=${divisionCode || 0}`)
  const result = await res.json()

  console.log("CATEGORY RESULT:", result)       // 👈 ADD THIS

  setCategoryList(result.data || [])
  setShowCategory(true)
}
const openBrand = async ()=>{
  const res = await fetch(`/api/data?type=brandLookup&category=${categoryCode || 0}`)
  const result = await res.json()
  setBrandList(result.data || [])
  setShowBrand(true)
}

const openItem = async ()=>{
  const res = await fetch(
    `/api/data?type=itemLookup&division=${divisionCode||0}&category=${categoryCode||0}&brand=${brandCode||0}`
  )
  const result = await res.json()
  setItemList(result.data || [])
  setShowItem(true)
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
</label>
<label>
<input
type="radio"
name="report"
checked={report==="sales_details"}
onChange={()=>setReport("sales_details")}
/>
Sale Details
</label>
<label>
  <input
    type="radio"
    name="report"
    checked={report==="itemwise_sales"}
    onChange={()=>setReport("itemwise_sales")}
  />
  Item wise Sales
</label>
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
  <label>Salesman</label>

  <div className="customer-row">

    <input value={salesmanCode} placeholder="Code" readOnly/>

    <input value={salesmanName} placeholder="Description" readOnly/>

    <button className="customer-btn" onClick={openSalesman}>
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
{/* 🔥 DIVISION */}
<div className="filter-row">
  <label>Division</label>
  <div className="customer-row">
    <input value={divisionCode} placeholder="Code" readOnly/>
    <input value={divisionName} placeholder="Description" readOnly/>
    <button onClick={openDivision}>🔍</button>
  </div>
</div>

{/* 🔥 CATEGORY */}
<div className="filter-row">
  <label>Category</label>
  <div className="customer-row">
    <input value={categoryCode} placeholder="Code" readOnly/>
    <input value={categoryName} placeholder="Description" readOnly/>
    <button onClick={openCategory}>🔍</button>
  </div>
</div>

{/* 🔥 BRAND */}
<div className="filter-row">
  <label>Brand</label>
  <div className="customer-row">
    <input value={brandCode} placeholder="Code" readOnly/>
    <input value={brandName} placeholder="Description" readOnly/>
    <button onClick={openBrand}>🔍</button>
  </div>
</div>

{/* 🔥 ITEM */}
<div className="filter-row">
  <label>Item</label>
  <div className="customer-row">
    <input value={itemCode} placeholder="Code" readOnly/>
    <input value={itemName} placeholder="Description" readOnly/>
    <button onClick={openItem}>🔍</button>
  </div>
</div>
{/* USER LOOKUP */}
{showDivision && (
  <div className="lookup-overlay">
    <div className="lookup-modal">
      <div className="lookup-header">
        <span>Division Lookup</span>
        <button onClick={()=>setShowDivision(false)}>X</button>
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
            {divisionList.map((d,i)=>(
              <tr key={i} onClick={()=>selectDivision(d)}>
                <td>{d.CODE}</td>
                <td>{d.DESCRIPTION}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
{showCategory && (
  <div className="lookup-overlay">
    <div className="lookup-modal">
      <div className="lookup-header">
        <span>Category Lookup</span>
        <button onClick={()=>setShowCategory(false)}>X</button>
      </div>

      <table>
        <tbody>
          {categoryList.map((c,i)=>(
            <tr key={i} onClick={()=>selectCategory(c)}>
              <td>{c.CODE}</td>
              <td>{c.DESCRIPTION}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
{showBrand && (
  <div className="lookup-overlay">
    <div className="lookup-modal">
      <div className="lookup-header">
        <span>Brand Lookup</span>
        <button onClick={()=>setShowBrand(false)}>X</button>
      </div>

      <table>
        <tbody>
          {brandList.map((b,i)=>(
            <tr key={i} onClick={()=>selectBrand(b)}>
              <td>{b.CODE}</td>
              <td>{b.DESCRIPTION}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
{showItem && (
  <div className="lookup-overlay">
    <div className="lookup-modal">
      <div className="lookup-header">
        <span>Item Lookup</span>
        <button onClick={()=>setShowItem(false)}>X</button>
      </div>

      <table>
        <tbody>
          {itemList.map((i1,i)=>(
            <tr key={i} onClick={()=>selectItem(i1)}>
              <td>{i1.CODE}</td>
              <td>{i1.DESCRIPTION}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
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
{report === "sale_summary" && (
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
      <h4>
        {report === "sale_summary" && "SALES SUMMARY"}
        {report === "daily_summary" && "SALES SUMMARY (DAILY)"}
        {report === "monthly_summary" && "SALES SUMMARY (MONTHLY)"}
        {report === "sales_details" && "SALE DETAIL"}
      </h4>
      <button onClick={()=>setShowReport(false)}>✕</button>
    </div>

    <div className="report-modal-body">
      <div className="print-report">

        {/* 🔥 HEADER */}
        {/* 🔥 HEADER */}
{report !== "sales_details" && (
  <div style={{textAlign:"center", marginBottom:"20px"}}>
          <h3>{company || "Company Name"}</h3>
          <h4>
            {report === "sale_summary" && "SALES SUMMARY"}
            {report === "daily_summary" && "SALES SUMMARY (DAILY)"}
            {report === "monthly_summary" && "SALES SUMMARY (MONTHLY)"}
            {report === "sales_details" && "SALE DETAIL"}
          </h4>

          <p style={{fontSize:"12px"}}>
            For the period of {fromDate} to {toDate}, 
            Customer: {customerName || "ALL"}, 
            User: {userName || "ALL"}
          </p>
        </div>
)}
        {/* 🔥 SALES SUMMARY */}
        {report === "sale_summary" && (
          <table className="crystal-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Date</th>
                <th>Sale No</th>
                <th>Customer</th>
                <th>Gross</th>
                <th>Discount</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row,i)=>(
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{row.SALE_DATE}</td>
                  <td>{row.SALE_NO}</td>
                  <td>{row.CUST_NAME}</td>
                  <td>{row.GROSS_AMOUNT}</td>
                  <td>{row.TOT_DISC || 0}</td>
                  <td>{row.NET_AMOUNT}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
{/* 🔥 DAILY */}
{/* 🔥 DAILY */}
{report === "daily_summary" && (
  <table className="crystal-table">
    <thead>
      <tr>
        <th>SL</th>
        <th>Date</th>
        <th>Net Cost</th>
        <th>Gross</th>
        <th>Net</th>
        <th>Profit</th>
      </tr>
    </thead>

    <tbody>

      {data.length === 0 ? (
        <tr>
          <td>1</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      ) : (
        data.map((row,i)=>(
          <tr key={i}>
            <td>{i+1}</td>

            {/* ✅ DATE FIX */}
            <td>
              {row.DATE?.date 
                ? row.DATE.date.split(" ")[0] 
                : ""}
            </td>

            <td>{row.NET_COST}</td>
            <td>{row.GROSS_AMOUNT}</td>
            <td>{row.NET_AMOUNT}</td>

            {/* ✅ PROFIT */}
            <td>
              {(Number(row.NET_AMOUNT || 0) - Number(row.NET_COST || 0)).toFixed(2)}
            </td>
          </tr>
        ))
      )}

      {/* TOTAL */}
      <tr>
        <td colSpan="2"><b>Total</b></td>

        <td>
          <b>{data.reduce((s,r)=>s + Number(r.NET_COST||0),0).toFixed(2)}</b>
        </td>

        <td>
          <b>{data.reduce((s,r)=>s + Number(r.GROSS_AMOUNT||0),0).toFixed(2)}</b>
        </td>

        <td>
          <b>{data.reduce((s,r)=>s + Number(r.NET_AMOUNT||0),0).toFixed(2)}</b>
        </td>

        <td>
          <b>
            {data.reduce((s,r)=>
              s + (Number(r.NET_AMOUNT||0) - Number(r.NET_COST||0)),0
            ).toFixed(2)}
          </b>
        </td>

      </tr>

    </tbody>
  </table>
)}
   {/* 🔥 MONTHLY */}
{report === "monthly_summary" && (
  <table className="crystal-table">
    <thead>
      <tr>
        <th>SL</th>
        <th>Month</th>
        <th>Year</th>
        <th>Net Cost</th>
        <th>Rate</th>
        <th>Discount</th>
        <th>Net</th>
        <th>Profit</th>
      </tr>
    </thead>

    <tbody>
  {data.length === 0 ? (
    <tr>
      <td colSpan="8" style={{textAlign:"center"}}>No Data</td>
    </tr>
  ) : (
    <>
      {data.map((row,i)=>{

        const netCost = Number(row.NET_COST || 0)
        const netAmt  = Number(row.NET_AMOUNT || 0)

        // ✅ FULL DISCOUNT
        const discount =
          Number(row.ITEM_DISCOUNT || 0) +
          Number(row.DISC_AMOUNT || 0)

        // ✅ RATE = NET + DISCOUNT
        const rate = netAmt + discount

        // ✅ PROFIT (same as C#)
        const profit =
          Number(row.GROSS_AMOUNT || 0) > 0
            ? Number(row.GROSS_AMOUNT) - netCost
            : netAmt - netCost

        return (
          <tr key={i}>
            <td>{i+1}</td>

            <td>{row.MONTH}</td>
            <td>{row.YEAR}</td>

            <td>{netCost.toFixed(2)}</td>

            {/* ✅ RATE FIX */}
            <td>{rate.toFixed(2)}</td>

            {/* ✅ DISCOUNT FIX */}
            <td>{discount.toFixed(2)}</td>

            <td>{netAmt.toFixed(2)}</td>

            {/* ✅ PROFIT FIX */}
            <td>{profit.toFixed(2)}</td>
          </tr>
        )
      })}

      {/* 🔥 TOTAL ROW */}
      <tr>
        <td colSpan="3"><b>Total</b></td>

        <td>
          <b>{data.reduce((s,r)=>s + Number(r.NET_COST||0),0).toFixed(2)}</b>
        </td>

        <td>
          <b>{
            data.reduce((s,r)=>
              s + (
                Number(r.NET_AMOUNT||0) +
                Number(r.ITEM_DISCOUNT||0) +
                Number(r.DISC_AMOUNT||0)
              ),0
            ).toFixed(2)
          }</b>
        </td>

        <td>
          <b>{
            data.reduce((s,r)=>
              s + (
                Number(r.ITEM_DISCOUNT||0) +
                Number(r.DISC_AMOUNT||0)
              ),0
            ).toFixed(2)
          }</b>
        </td>

        <td>
          <b>{data.reduce((s,r)=>s + Number(r.NET_AMOUNT||0),0).toFixed(2)}</b>
        </td>

        <td>
          <b>{
            data.reduce((s,r)=>
              s + (
                (Number(r.GROSS_AMOUNT||0) > 0
                  ? Number(r.GROSS_AMOUNT)
                  : Number(r.NET_AMOUNT))
                - Number(r.NET_COST||0)
              ),0
            ).toFixed(2)
          }</b>
        </td>
      </tr>
    </>
  )}
</tbody>
  </table>
)}

{report === "sales_details" && (
<div className="print-container">

{data.length === 0 ? (
  <h3 style={{textAlign:"center"}}>No Data Found</h3>
) : (

Object.values(
  data.reduce((acc, row) => {
    if (!acc[row.SALE_NO]) {
      acc[row.SALE_NO] = {
        items: [],
        first: row
      }
    }
    acc[row.SALE_NO].items.push(row)
    return acc
  }, {})
).map((sale, index) => {

const total = sale.items.reduce(
  (sum, r) => sum + Number(r.AMOUNT || 0), 0
)

return (

<div key={index} className="print-page">

  <div className="header">
  <h2>{company}</h2>   {/* ✅ FIXED */}
  <h4>SALE DETAIL</h4>

  <p>
    For the period of {fromDate} to {toDate}, 
    Store: DEFAULT STORE, 
    Customer: {sale.first?.CUST_NAME}, 
    User: admin
  </p>

  <p><b>Salesman :</b></p>
</div>
  {/* SALE INFO */}
  <div className="info">
    <p><b>Sale Date :</b> {sale.first?.SALE_DATE?.date?.split(" ")[0]}</p>
    <p><b>Sale No :</b> {sale.first?.SALE_NO}</p>
    <p><b>Customer :</b> {sale.first?.CUST_NAME}</p>
  </div>

  {/* TABLE */}
  <table className="report-table">
    <thead>
      <tr>
        <th>SL</th>
        <th>Brand Name</th>
        <th>Code</th>
        <th>Description</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th>Sale Rate</th>
        <th>GST</th>
        <th>Amount</th>
      </tr>
    </thead>

    <tbody>
      {sale.items.map((row, i) => (
        <tr key={i}>
          <td>{i+1}</td>
          <td>{row.BRAND_NAME || ""}</td>
          <td>{row.ITEM_CODE}</td>
          <td>{row.DESCRIPTION}</td>
          <td>{row.QUANTITY}</td>
          <td>{row.UOM}</td>
          <td>{Number(row.RATE).toFixed(2)}</td>
          <td>{Number(row.GST).toFixed(2)}</td>
          <td>{Number(row.AMOUNT).toFixed(2)}</td>
        </tr>
      ))}

      {/* TOTAL */}
      <tr>
        <td colSpan="8" className="total-label">TOTAL</td>
        <td>{total.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  {/* RIGHT SIDE SUMMARY */}
  <div className="summary">
    <p><b>OPENING BALANCE :</b> 0.00</p>
    <p><b>DISCOUNT :</b> {sale.first?.DISCOUNT || 0}</p>
    <p><b>BILL AMOUNT :</b> {total.toFixed(2)}</p>
    <p><b>RECEIVED AMOUNT :</b> {sale.first?.REC_AMOUNT || 0}</p>
    <p><b>BALANCE :</b> 0.00</p>
  </div>
<div className="item-summary-container">

  {/* LEFT SIDE TABLE */}
  <div className="item-summary-left">

    <h4>ITEM WISE SUMMARY</h4>

    <table className="report-table">
      <thead>
        <tr>
          <th>SL</th>
          <th>Item</th>
          <th>Batch</th>
          <th>Unit</th>
          <th>Quantity</th>
          <th>Rate</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        {sale.items.map((row,i)=>(

          <tr key={i}>
            <td>{i+1}</td>
            <td>{row.DESCRIPTION}</td>
            <td>{row.BATCH || "0.00"}</td>
            <td>{row.UOM}</td>
            <td>{row.QUANTITY}</td>
            <td>{Number(row.RATE).toFixed(2)}</td>
            <td>{Number(row.AMOUNT).toFixed(2)}</td>
          </tr>

        ))}
      </tbody>
    </table>

  </div>

  {/* RIGHT SIDE TOTALS */}
  <div className="item-summary-right">

    <p><b>TOTAL DISCOUNT :</b> {sale.first?.DISCOUNT || 0}</p>
    <p><b>TOTAL SALES :</b> {total.toFixed(2)}</p>
    <p><b>TOTAL RECEIVED :</b> {sale.first?.REC_AMOUNT || 0}</p>
    <p><b>TOTAL BALANCE :</b> 0.00</p>

  </div>

</div>
</div>

)

})

)}

</div>
)}
{report === "itemwise_sales" && (
<>
{data.length === 0 ? (
  <p style={{textAlign:"center"}}>No Data Found</p>
) : (
  <>
    {[...new Set(data.map(row => row.CUST_NAME))].map((item, index) => {
      const itemData = data.filter(row => row.CUST_NAME === item)

      return (
        <div key={index} style={{marginBottom:"30px"}}>

          {/* 🔥 ITEM NAME */}
          <div style={{fontWeight:"bold", marginTop:"10px"}}>
            ITEM NAME : {item}
          </div>

          {/* 🔥 BRAND */}
          <div style={{marginLeft:"20px", marginBottom:"10px"}}>
            BRAND : {itemData[0]?.BRAND_NAME || ""}
          </div>

          {/* 🔥 TABLE */}
          <table className="crystal-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Date</th> 
                <th>Sale No</th>
                <th>Customer</th>
                <th>Unit</th>
                <th>Rate</th>
                <th>Discount</th>
                <th>GST</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {itemData.map((row,i)=>(

                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{row.SALE_DATE}</td>
                  <td>{row.SALE_NO}</td>
                  <td>{row.CUST_NAME}</td>
                  <td>{row.UOM}</td>
                  <td>{Number(row.RATE).toFixed(2)}</td>
                  <td>{Number(row.DISCOUNT).toFixed(2)}</td>
                  <td>{Number(row.GST).toFixed(2)}</td>
                  <td>{Number(row.AMOUNT).toFixed(2)}</td>
                </tr>

              ))}

              {/* 🔥 ITEM TOTAL */}
              <tr>
                <td colSpan="8" style={{textAlign:"right"}}>
                  <b>Item Total</b>
                </td>
                <td>
                  <b>
                    {itemData.reduce((sum,row)=> sum + Number(row.AMOUNT || 0),0).toFixed(2)}
                  </b>
                </td>
              </tr>

            </tbody>
          </table>

        </div>
      )
    })}

    {/* 🔥 GRAND TOTAL */}
    <div style={{borderTop:"2px solid black", paddingTop:"10px", textAlign:"right"}}>
      <b>
        Grand Total : {
          data.reduce((sum,row)=> sum + Number(row.AMOUNT || 0),0).toFixed(2)
        }
      </b>
    </div>

  </>
)}
</>
)}
 </div>
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
{showSalesman && (

<div className="lookup-overlay">

  <div className="lookup-modal">

    <div className="lookup-header">
      <span>Salesman Lookup</span>
      <button onClick={()=>setShowSalesman(false)}>X</button>
    </div>

    <div className="lookup-search">
      <input
        placeholder="Find Salesman"
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

        {(salesmanList || [])
        .filter((s)=>
          s.DESCRIPTION.toLowerCase().includes(search.toLowerCase()) ||
          s.CODE.toString().includes(search)
        )
        .map((s,i)=>(

          <tr key={i} onClick={()=>selectSalesman(s)}>
            <td>{s.CODE}</td>
            <td>{s.DESCRIPTION}</td>
          </tr>

        ))}

        </tbody>

      </table>
    </div>

    <div className="lookup-footer">
      <button onClick={()=>setShowSalesman(false)}>Cancel</button>
    </div>

  </div>

</div>

)}
</div>

)

}

export default SalesReports