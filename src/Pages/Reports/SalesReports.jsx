import { useState, useEffect } from "react";

function SalesReports(){

const [fromDate,setFromDate] = useState("")
const [toDate,setToDate] = useState("")
const [opts,setOpts] = useState(0)
const [stype,setStype] = useState(0)

const [data,setData] = useState([])
const [stores,setStores] = useState([])
const [store,setStore] = useState(0)

const [loading,setLoading] = useState(false)

const [customerCode,setCustomerCode] = useState("")
const [customerName,setCustomerName] = useState("")

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

try{

const url =
`/api/data?type=salesSummary&from=${fromDate}&to=${toDate}&store=${store}&custid=${customerCode || 0}&opts=${opts}&stype=${stype}`

const res = await fetch(url)

const result = await res.json()

if(result.status==="success"){

setData(result.data)

}else{

alert("Report failed")

}

}catch(err){

alert("Server error")

}

setLoading(false)

}


/* PRINT */

const printTable = ()=>{

const win = window.open("","","width=900,height=700")

const rows = data.map(row=>`

<tr>
<td>${row.SALE_NO}</td>
<td>${row.SALE_DATE}</td>
<td>${row.NET_AMOUNT}</td>
<td>${row.GROSS_AMOUNT}</td>
<td>${row.CUST_NAME}</td>
</tr>

`).join("")

win.document.write(`

<h2>Sales Summary</h2>

<table border="1" width="100%" cellpadding="6">

<tr>
<th>Sale No</th>
<th>Date</th>
<th>Net</th>
<th>Gross</th>
<th>Customer</th>
</tr>

${rows}

</table>

`)

win.print()

}

return(

<div style={{padding:"20px"}}>

<h2>Sales Report</h2>

<div>

From
<input type="date" value={fromDate} onChange={e=>setFromDate(e.target.value)}/>

To
<input type="date" value={toDate} onChange={e=>setToDate(e.target.value)}/>

</div>

<div>

Store

<select value={store} onChange={e=>setStore(e.target.value)}>

<option value={0}>All</option>

{stores.map(s=>(
<option key={s.ID} value={s.ID}>{s.STORE_NAME}</option>
))}

</select>

</div>

<div>

<button onClick={handleLoad}>
{loading ? "Loading..." : "Load"}
</button>

<button onClick={printTable}>
Print
</button>

</div>

<table border="1" width="100%" style={{marginTop:20}}>

<thead>

<tr>
<th>Sale No</th>
<th>Date</th>
<th>Net</th>
<th>Gross</th>
<th>Customer</th>
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

)

}

export default SalesReports