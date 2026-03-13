export default async function handler(req, res) {

  try {

    const { type, from, to, store } = req.query;

    let url = "";

    if (type === "salesSummary") {
      url = `https://erp.codezyntax.com/api/salesSummary.php?from=${from}&to=${to}&store=${store}`;
    }

    else if (type === "getStores") {
      url = `https://erp.codezyntax.com/api/getStores.php`;
    }

    else if (type === "dailySalesReport") {
      url = `https://erp.codezyntax.com/api/dailySalesReport.php?from=${from}&to=${to}&store=${store}`;
    }

    else if (type === "dailySalesSummary") {
      url = `https://erp.codezyntax.com/api/dailySalesSummary.php?from=${from}&to=${to}&store=${store}`;
    }

    else if (type === "itemwiseSales") {
      url = `https://erp.codezyntax.com/api/itemwiseSales.php?from=${from}&to=${to}&store=${store}`;
    }

    else if (type === "itemwiseProfit") {
      url = `https://erp.codezyntax.com/api/itemwiseProfit.php?from=${from}&to=${to}&store=${store}`;
    }

    else if (type === "itemwiseSummary") {
      url = `https://erp.codezyntax.com/api/itemwiseSummary.php?from=${from}&to=${to}&store=${store}`;
    }

    else if (type === "salesProfit") {
      url = `https://erp.codezyntax.com/api/salesProfit.php?from=${from}&to=${to}&store=${store}`;
    }

    else if (type === "salesmanSales") {
      url = `https://erp.codezyntax.com/api/salesmanSales.php?from=${from}&to=${to}&store=${store}`;
    }

    else if (type === "salesTaxSummary") {
      url = `https://erp.codezyntax.com/api/salesTaxSummary.php?from=${from}&to=${to}&store=${store}`;
    }

    else if (type === "saleDetails") {
      url = `https://erp.codezyntax.com/api/saleDetails.php?from=${from}&to=${to}&store=${store}`;
    }

    else if (type === "customerLookup") {
      url = `https://erp.codezyntax.com/api/customerLookup.php`;
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