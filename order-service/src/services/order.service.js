import { consumerQueue } from "../providers/amqplib.js";

export const processOrders = async () => {
  // TODO consume order
  await consumerQueue({ queue: "order" });
};
