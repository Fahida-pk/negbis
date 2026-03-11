import { useState } from "react";

function SalesReport(){

const [from,setFrom] = useState("");
const [to,setTo] = useState("");
const [data,setData] = useState([]);

const loadReport = async () =>{

const res = await fetch(
`http://localhost/api/sales_summary.php?from=${from}&to=${to}`
);

const result = await res.json();

setData(result);

}

return(

<div style={{padding:"20px"}}>

<h2>Sales Summary Report</h2>

From :
<input
type="date"
value={from}
onChange={(e)=>setFrom(e.target.value)}
/>

To :
<input
type="date"
value={to}
onChange={(e)=>setTo(e.target.value)}
/>

<button onClick={loadReport}>
Print
</button>

<table border="1" width="100%">

<thead>

<tr>

<th>Sale No</th>
<th>Date</th>
<th>Customer</th>
<th>Net Amount</th>
<th>Gross Amount</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{data.map((item)=>(

<tr key={item.id}>

<td>{item.sale_no}</td>
<td>{item.sale_date}</td>
<td>{item.cust_name}</td>
<td>{item.net_amount}</td>
<td>{item.gross_amount}</td>
<td>{item.status_desc}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default SalesReport;