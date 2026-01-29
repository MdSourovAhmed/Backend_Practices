import amqp from "amqplib";

const RABBIT_URL = "amqp://localhost";

let channel;

export async function connectRabbit() {
  const connection = await amqp.connect(RABBIT_URL);
  channel = await connection.createChannel();
  await channel.assertQueue("orders");
}

export async function sendToQueue(queue, data) {
  if (!channel) await connectRabbit();
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
}
