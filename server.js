const express = require("express");
const app = express();
const port = 3000;

// Enable CORS for the client to connect
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/crypto-prices", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendCryptoUpdate = () => {
    const cryptoPrices = {
      BTC: (Math.random() * 1000 + 30000).toFixed(2),
      ETH: (Math.random() * 100 + 2000).toFixed(2),
      XRP: (Math.random() * 10 + 0.5).toFixed(4),
    };

    res.write(`data: ${JSON.stringify(cryptoPrices)}\n\n`);
  };

  // Send price update every 5 seconds
  const intervalId = setInterval(sendCryptoUpdate, 5000);

  // Clear interval when client closes connection
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(port, () => {
  console.log(
    `Cryptocurrency price server running at http://localhost:${port}`
  );
});
