import express from "express";
import { sendToQueue } from "./rabbit.js";

const app = express();
app.use(express.json());
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});


app.post("/order", async (req, res) => {
  const order = {
    id: Date.now(),
    item: req.body.item,
    quantity: req.body.quantity
  };

  await sendToQueue("orders", order);

  res.json({
    message: "Order placed",
    orderId: order.id
  });
});

app.listen(3000, () =>
  console.log("API running on port 3000")
);
