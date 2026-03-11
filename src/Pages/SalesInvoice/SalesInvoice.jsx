import { useState } from "react";

function SalesInvoice(){

const [fromDate,setFromDate]=useState("");
const [toDate,setToDate]=useState("");
const [data,setData]=useState([]);

const loadData=async()=>{

const res=await fetch(
`https://negbis.codezyntax.com/api/salesSummary.php?from=${fromDate}&to=${toDate}`
);

const result=await res.json();

setData(result);

};

return(

<div style={{padding:"20px"}}>

<h2>Sales Invoice Report</h2>

<input
type="date"
value={fromDate}
onChange={(e)=>setFromDate(e.target.value)}
/>

<input
type="date"
value={toDate}
onChange={(e)=>setToDate(e.target.value)}
/>

<button onClick={loadData}>Search</button>

<table border="1" width="100%" style={{marginTop:"20px"}}>

<thead style={{background:"#1c2a3a",color:"white"}}>

<tr>
<th>Invoice No</th>
<th>Date</th>
<th>Customer</th>
<th>Net Amount</th>
<th>Gross Amount</th>
</tr>

</thead>

<tbody>

{data.map((item,index)=>(

<tr key={index}>

<td>{item.SALE_NO}</td>
<td>{item.SALE_DATE}</td>
<td>{item.CUST_NAME}</td>
<td>{item.NET_AMOUNT}</td>
<td>{item.GROSS_AMOUNT}</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default SalesInvoice;