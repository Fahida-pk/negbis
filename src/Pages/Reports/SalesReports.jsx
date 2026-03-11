import { useState } from "react";
import "./reports.css";

function SalesReports() {

  const [report, setReport] = useState("sale_summary");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [data, setData] = useState([]);

  const handlePrint = async () => {

    let api = "";

    if (report === "sale_summary") api = "/api/salesSummary";
    if (report === "daily_sales_summary") api = "/api/dailySalesSummary";
    if (report === "monthly_sales_summary") api = "/api/monthlySalesSummary";
    if (report === "sale_details") api = "/api/saleDetails";
    if (report === "itemwise_sales") api = "/api/itemwiseSales";
    if (report === "itemwise_profit") api = "/api/itemwiseProfit";
    if (report === "itemwise_summary") api = "/api/itemwiseSummary";
    if (report === "salesman_sales") api = "/api/salesmanSales";
    if (report === "daily_sales_report") api = "/api/dailySalesReport";
    if (report === "sales_profit") api = "/api/salesProfit";
    if (report === "sales_tax_summary") api = "/api/salesTaxSummary";

    try {

      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromDate,
          to: toDate
        })
      });

      const result = await res.json();

      if (result && result.data) {
        setData(result.data);
      } else {
        setData([]);
      }

    } catch (err) {
      console.log("API error:", err);
      setData([]);
    }

  };


  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setData([]);
  };


  const handleClose = () => {
    window.history.back();
  };


  return (

    <div className="report-container">

      <div className="report-box">

        <h3>Sales Invoice Reports</h3>

        <div className="report-content">

          {/* LEFT MENU */}

          <div className="report-left">

            <label>
              <input
                type="radio"
                name="report"
                checked={report === "sale_summary"}
                onChange={() => setReport("sale_summary")}
              />
              Sale Summary
            </label>

            <label>
              <input
                type="radio"
                name="report"
                onChange={() => setReport("daily_sales_summary")}
              />
              Daily Sales Summary
            </label>

            <label>
              <input
                type="radio"
                name="report"
                onChange={() => setReport("monthly_sales_summary")}
              />
              Monthly Sales Summary
            </label>

            <label>
              <input
                type="radio"
                name="report"
                onChange={() => setReport("sale_details")}
              />
              Sale Details
            </label>

            <label>
              <input
                type="radio"
                name="report"
                onChange={() => setReport("itemwise_sales")}
              />
              Item wise Sales
            </label>

            <label>
              <input
                type="radio"
                name="report"
                onChange={() => setReport("itemwise_profit")}
              />
              Item wise Profit
            </label>

            <label>
              <input
                type="radio"
                name="report"
                onChange={() => setReport("itemwise_summary")}
              />
              Item wise Summary
            </label>

            <label>
              <input
                type="radio"
                name="report"
                onChange={() => setReport("salesman_sales")}
              />
              Salesman wise Sales
            </label>

            <label>
              <input
                type="radio"
                name="report"
                onChange={() => setReport("daily_sales_report")}
              />
              Daily Sales Report
            </label>

            <label>
              <input
                type="radio"
                name="report"
                onChange={() => setReport("sales_profit")}
              />
              Sales Profit
            </label>

            <label>
              <input
                type="radio"
                name="report"
                onChange={() => setReport("sales_tax_summary")}
              />
              Sale Tax Summary
            </label>

          </div>


          {/* RIGHT FILTER */}

          <div className="report-right">

            <div className="filter-row">

              <label>Date From</label>

              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />

              <label>To</label>

              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />

            </div>

            <div className="filter-row">
              <label>Store</label>
              <input type="text" placeholder="DEFAULT STORE" />
            </div>

            <div className="filter-row">
              <label>Customer</label>
              <input type="text" placeholder="Code" />
              <input type="text" placeholder="Description" />
            </div>

            <div className="filter-row">
              <label>Salesman</label>
              <input type="text" placeholder="Code" />
              <input type="text" placeholder="Description" />
            </div>

            <div className="filter-row">
              <label>Item</label>
              <input type="text" placeholder="Code" />
              <input type="text" placeholder="Description" />
            </div>

            <div className="buttons">

              <button className="print" onClick={handlePrint}>
                Print
              </button>

              <button className="clear" onClick={handleClear}>
                Clear
              </button>

              <button className="close" onClick={handleClose}>
                Close
              </button>

            </div>

          </div>

        </div>


        {/* RESULT TABLE */}

        {data.length > 0 && (

          <div style={{ overflowX: "auto" }}>

            <table className="report-table">

              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>

                {data.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );
}

export default SalesReports;