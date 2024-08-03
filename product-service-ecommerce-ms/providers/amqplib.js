import amqp from "amqplib";

export async function addQueueItem({ queue, item }) {
  try {
    const connection = await connect();
    const channel01 = await connection.createChannel();
    const data = Buffer.from(JSON.stringify(item));

    await channel01.assertQueue(queue, { durable: true });
    channel01.sendToQueue(queue, data);

    setTimeout(function () {
      connection.close();
    }, 1000);

    console.log(" ✅ Sent new item to queue:", queue);
  } catch (error) {
    console.error("addQueueItem ~ error:", error);
  }
}

const connect = async () => {
  return await amqp.connect("amqp://myuser:mypassword@localhost");
};
