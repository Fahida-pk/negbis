import { useState } from "react";

function SalesInvoice() {

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [data, setData] = useState([]);

  const loadReport = async () => {

    if (!fromDate || !toDate) {
      alert("Select date");
      return;
    }

    try {

      const res = await fetch(
        `https://erp.codezyntax.com/api/salesSummary.php?from=${fromDate}&to=${toDate}`
      );

      const result = await res.json();

      setData(result);

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>Sales Invoice Report</h2>

      {/* FILTER SECTION */}
      <div style={{ marginBottom: "20px" }}>

        <label>From Date :</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{ marginRight: "20px", marginLeft: "10px" }}
        />

        <label>To Date :</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{ marginLeft: "10px", marginRight: "20px" }}
        />

        <button onClick={loadReport}>Search</button>

      </div>

      {/* TABLE */}

      <table border="1" cellPadding="10" width="100%">

        <thead style={{ background: "#1c2a3a", color: "white" }}>
          <tr>
            <th>Invoice No</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Net Amount</th>
            <th>Gross Amount</th>
          </tr>
        </thead>

        <tbody>

          {data.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Data
              </td>
            </tr>
          ) : (

            data.map((item, index) => (

              <tr key={index}>
                <td>{item.SALE_NO}</td>
                <td>{item.SALE_DATE}</td>
                <td>{item.CUST_NAME}</td>
                <td>{item.NET_AMOUNT}</td>
                <td>{item.GROSS_AMOUNT}</td>
              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );
}

export default SalesInvoice;