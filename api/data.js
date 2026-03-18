export default async function handler(req, res) {

  try {

    const {
      type,
      from,
      to,
      store,
      custid,
      opts,
      stype,
      status,
      salesman,
      user,
      estimate
    } = req.query;

    let url = "";

    if (type === "salesSummary") {

      url = `https://erp.codezyntax.com/api/salesSummary.php?from=${from}&to=${to}&store=${store}&custid=${custid || 0}&opts=${opts || 0}&stype=${stype || 0}&status=${status || ""}&salesman=${salesman || 0}&user=${user || 0}&estimate=${estimate || 0}`;

    }

    else if (type === "getStores") {

      url = `https://erp.codezyntax.com/api/getStores.php`;

    }

    else if (type === "customerLookup") {

      url = `https://erp.codezyntax.com/api/customerLookup.php`;

    }
else if (type === "userLookup") {

url = `https://erp.codezyntax.com/api/userLookup.php`;

}
else if (type === "dailySalesSummary") {

  url = `https://erp.codezyntax.com/api/Sales%20Daily%20Summary.php?from=${from}&to=${to}&store=${store || 0}`;

}
else if (type === "monthlySalesSummary") {

  url = `https://erp.codezyntax.com/api/monthly_Sales_Summary.php
  ?from=${from}
  &to=${to}
  &store=${store || 0}`;
  

}
    else {

      return res.status(400).json({
        status: "error",
        message: "Invalid API type"
      });

    }

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({
      status: "error",
      message: "Proxy server error"
    });

  }

}