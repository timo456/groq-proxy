const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors"); // ⬅️ 加上這行
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.GROQ_API_KEY;

app.use(cors()); // ⬅️ ✅ 允許所有網域發起請求（解決 CORS 問題）
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { messages, model = "llama3-8b-8192" } = req.body;
  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ model, messages })
    });

    const data = await groqRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Groq Proxy Server is running.");
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
