import React from "react";

function Dashboard() {

  const reports = [
    "Sales Report",
    "Purchase Report",
    "Stock Report",
    "Receipt Report",
    "Payment Report",
    "Ledger Report"
  ];

  return (

    <div className="min-h-screen bg-[#0b2c63] text-white">

      {/* TOP MENU */}
      <div className="flex gap-8 bg-gray-800 px-6 py-3 text-sm font-semibold">

        <div className="cursor-pointer hover:text-yellow-300">
          Dashboard
        </div>

        <div className="cursor-pointer hover:text-yellow-300">
          Reports
        </div>

      </div>


      {/* DASHBOARD CONTENT */}
      <div className="p-10">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>


        {/* REPORTS SECTION */}
        <h2 className="text-xl font-semibold mb-4">
          Reports
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {reports.map((report, index) => (
            <div
              key={index}
              className="bg-white text-black p-6 rounded-xl shadow hover:scale-105 transition cursor-pointer"
            >
              {report}
            </div>
          ))}

        </div>

      </div>


      {/* BOTTOM TEXT */}

      <div className="absolute bottom-10 left-10 text-white">

        <h2 className="text-3xl font-semibold">
          CodeZyntax Softwares L.L.P
        </h2>

        <p className="mt-2 text-lg">
          +91 88484 18551
        </p>

        <h1 className="text-3xl font-bold mt-6">
          neGbis ERP v8.0.6
        </h1>

      </div>

    </div>
  );
}

export default Dashboard;