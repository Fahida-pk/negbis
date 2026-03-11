import { useState } from "react";
import "./reports.css";

function SalesReports() {

  const [report, setReport] = useState("sale_summary");

  return (

    <div className="report-container">

      <div className="report-box">

        <h3>Sales Invoice Reports</h3>

        <div className="report-content">

          {/* LEFT MENU */}

          <div className="report-left">

            <label>
              <input type="radio"
              name="report"
              onChange={()=>setReport("sale_summary")}
              /> Sale Summary
            </label>

            <label>
              <input type="radio"
              name="report"
              onChange={()=>setReport("daily_sales_summary")}
              /> Daily Sales Summary
            </label>

            <label>
              <input type="radio"
              name="report"
              onChange={()=>setReport("monthly_sales_summary")}
              /> Monthly Sales Summary
            </label>

            <label>
              <input type="radio"
              name="report"
              onChange={()=>setReport("sale_details")}
              /> Sale Details
            </label>

            <label>
              <input type="radio"
              name="report"
              onChange={()=>setReport("itemwise_sales")}
              /> Item wise Sales
            </label>

            <label>
              <input type="radio"
              name="report"
              onChange={()=>setReport("itemwise_profit")}
              /> Item wise Profit
            </label>

            <label>
              <input type="radio"
              name="report"
              onChange={()=>setReport("itemwise_summary")}
              /> Item wise Summary
            </label>

            <label>
              <input type="radio"
              name="report"
              onChange={()=>setReport("salesman_sales")}
              /> Salesman wise Sales
            </label>

            <label>
              <input type="radio"
              name="report"
              onChange={()=>setReport("daily_sales_report")}
              /> Daily Sales Report
            </label>

            <label>
              <input type="radio"
              name="report"
              onChange={()=>setReport("sales_profit")}
              /> Sales Profit
            </label>

            <label>
              <input type="radio"
              name="report"
              onChange={()=>setReport("sales_tax_summary")}
              /> Sale Tax Summary
            </label>

          </div>

          {/* RIGHT FILTER */}

          <div className="report-right">

            <div className="filter-row">
              <label>Date From</label>
              <input type="date" />
              <label>To</label>
              <input type="date" />
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

              <button className="print">Print</button>

              <button className="clear">Clear</button>

              <button className="close">Close</button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SalesReports;