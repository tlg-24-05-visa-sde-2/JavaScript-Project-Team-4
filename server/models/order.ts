import mongoose, { Document, Schema } from "mongoose";
import { ProductDocument } from "./product";
import { UserDocument } from "./user";

interface OrderItem {
  product: ProductDocument;
  quantity: number;
  price: number;
}

interface OrderDocument extends Document {
  user: mongoose.Schema.Types.ObjectId | UserDocument;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: Date;
}

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true, enum: ["pending", "completed", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model<OrderDocument>("Order", orderSchema);

export { Order, OrderDocument, orderItemSchema };