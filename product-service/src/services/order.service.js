import Order from "../models/order.js";
import { addQueueItem } from "../providers/amqplib.js";
import mongoose from "mongoose";

export const createNewOrder = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const prouctId = req.params.id;
    const { paymentMethod } = req.body;
    const paymentStatus = "PENDING";
    const orderStatus = "PENDING";
    const prodIdObj = new mongoose.Types.ObjectId(customerId);
    const customerIdObj = new mongoose.Types.ObjectId(prouctId);

    const order = await Order.create({
      productId: prodIdObj,
      customerId: customerIdObj,
      paymentStatus,
      orderStatus,
      paymentMethod,
    });
    const orderData = JSON.stringify(order);

    await addQueueItem({ queue: `order`, item: orderData });
    res
      .status(201)
      .send({ message: `New order created and sent to queue ${order}` });
  } catch (error) {
    console.error(`Erro ao fazer pedido `, error.message);
  }
};
