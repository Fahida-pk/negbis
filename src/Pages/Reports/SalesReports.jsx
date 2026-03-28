import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import "./reports.css";

function SalesReports(){

/* ---------------- STATE ---------------- */

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

/* ---------------- LOAD FUNCTIONS ---------------- */

const openDivision = async ()=>{
  const res = await fetch("/api/data?type=divisionLookup")
  const result = await res.json()
  setDivisionList(result.data || [])
  setShowDivision(true)
}

const openCategory = async ()=>{
  const res = await fetch(`/api/data?type=categoryLookup&division=${divisionCode || 0}`)
  const result = await res.json()
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

/* ---------------- SELECT FUNCTIONS ---------------- */

const selectDivision = (d)=>{
  setDivisionCode(d.CODE)
  setDivisionName(d.DESCRIPTION)
  setCategoryCode("")
  setCategoryName("")
  setBrandCode("")
  setBrandName("")
  setShowDivision(false)
}

const selectCategory = (c)=>{
  setCategoryCode(c.CODE)
  setCategoryName(c.DESCRIPTION)
  setBrandCode("")
  setBrandName("")
  setShowCategory(false)
}

const selectBrand = (b)=>{
  setBrandCode(b.CODE)
  setBrandName(b.DESCRIPTION)
  setShowBrand(false)
}

const selectItem = (i)=>{
  setItemCode(i.CODE)
  setItemName(i.DESCRIPTION)
  setShowItem(false)
}

/* ---------------- UI ---------------- */

return(

<div className="report-container">

<Sidebar/>

<div className="report-box">

<h3>Sales Invoice Reports</h3>

{/* 🔥 DIVISION */}
<div className="filter-row">
<label>Division</label>
<div className="customer-row">
<input value={divisionCode} readOnly/>
<input value={divisionName} readOnly/>
<button onClick={openDivision}>🔍</button>
</div>
</div>

{/* 🔥 CATEGORY */}
<div className="filter-row">
<label>Category</label>
<div className="customer-row">
<input value={categoryCode} readOnly/>
<input value={categoryName} readOnly/>
<button onClick={openCategory}>🔍</button>
</div>
</div>

{/* 🔥 BRAND */}
<div className="filter-row">
<label>Brand</label>
<div className="customer-row">
<input value={brandCode} readOnly/>
<input value={brandName} readOnly/>
<button onClick={openBrand}>🔍</button>
</div>
</div>

{/* 🔥 ITEM */}
<div className="filter-row">
<label>Item</label>
<div className="customer-row">
<input value={itemCode} readOnly/>
<input value={itemName} readOnly/>
<button onClick={openItem}>🔍</button>
</div>
</div>

</div>

{/* ---------------- MODALS ---------------- */}

{/* DIVISION */}
{showDivision && (
<div className="lookup-overlay">
<div className="lookup-modal">
<h4>Select Division</h4>
<table>
<tbody>
{divisionList.map((d,i)=>(
<tr key={i} onClick={()=>selectDivision(d)}>
<td>{d.CODE}</td>
<td>{d.DESCRIPTION}</td>
</tr>
))}
</tbody>
</table>
<button onClick={()=>setShowDivision(false)}>Close</button>
</div>
</div>
)}

{/* CATEGORY */}
{showCategory && (
<div className="lookup-overlay">
<div className="lookup-modal">
<h4>Select Category</h4>
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
<button onClick={()=>setShowCategory(false)}>Close</button>
</div>
</div>
)}

{/* BRAND */}
{showBrand && (
<div className="lookup-overlay">
<div className="lookup-modal">
<h4>Select Brand</h4>
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
<button onClick={()=>setShowBrand(false)}>Close</button>
</div>
</div>
)}

{/* ITEM */}
{showItem && (
<div className="lookup-overlay">
<div className="lookup-modal">
<h4>Select Item</h4>
<table>
<tbody>
{itemList.map((i,index)=>(
<tr key={index} onClick={()=>selectItem(i)}>
<td>{i.CODE}</td>
<td>{i.DESCRIPTION}</td>
</tr>
))}
</tbody>
</table>
<button onClick={()=>setShowItem(false)}>Close</button>
</div>
</div>
)}

</div>

)
}

export default SalesReports