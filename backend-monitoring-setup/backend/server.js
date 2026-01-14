const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();
const { register } = require("./utils/metric");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Backend running ✅"));

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
