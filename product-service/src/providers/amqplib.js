import amqp from "amqplib";

export async function addQueueItem({ queue, item }) {
  try {
    const connection = await connect();
    const channel01 = await connection.createChannel();
    console.log(
      "🚀 ~ addQueueItem ~ JSON.stringify(item):",
      JSON.stringify(item)
    );
    const data = Buffer.from(item);

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
  return await amqp.connect("amqp://guest:guest@localhost:5672");
};
