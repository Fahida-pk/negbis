export default async function handler(req, res) {

  try {

    const response = await fetch("https://erp.codezyntax.com/api/itemwise_summary.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({
      status: "error",
      message: "Proxy server error"
    });

  }

}