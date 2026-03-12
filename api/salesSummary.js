export default async function handler(req, res) {

  try {

    const { from, to } = req.body;

    const response = await fetch(
      `https://erp.codezyntax.com/api/salesSummary.php?from=${from}&to=${to}`
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({
      status:"error",
      message:"Proxy server error"
    });

  }

}