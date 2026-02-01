import amqp from "amqplib";

const RABBIT_URL = "amqp://localhost";

async function startWorker() {
  const connection = await amqp.connect(RABBIT_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue("orders");

  console.log("Worker waiting for messages...");

  channel.consume("orders", async (msg) => {
    const order = JSON.parse(msg.content.toString());

    console.log("Processing order:", order);

    // Simulate heavy work
    await new Promise(r => setTimeout(r, 3000));

    console.log("Order processed:", order.id);

    channel.ack(msg);
  });
}

startWorker();
