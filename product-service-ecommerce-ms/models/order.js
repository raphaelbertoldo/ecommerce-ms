import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["PENDING", "PAID", "REFUNDED", "FAILED"],
  },
  orderStatus: {
    type: String,
    required: true,
    enum: [
      "PENDING",
      "IN_PROGRESS",
      "PACKAGED",
      "ON_THE_WAY",
      "RECEIVED",
      "CANCELLED",
    ],
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["CREDIT_CARD", "PAYPAL", "BANK_TRANSFER"],
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
