import mongoose, { Document } from "mongoose";
import { productSchema, ProductDocument } from "./product"; // Import product schema

// Single cart item schema
const cartItemSchema = new mongoose.Schema({
  product: productSchema,
  quantity: { type: Number, required: true, default: 1 },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    savedProducts: [productSchema], // Embed product schema
    cart: [cartItemSchema], // Embed cart item schema
    totalPrice: { type: Number, default: 0 }, // Add totalPrice field
    stripeAccountId: { type: String, required: false },
    favorites: [productSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

interface CartItem {
    product: ProductDocument;
    quantity: number;
  }
  

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  savedProducts: ProductDocument[];
  cart: CartItem[];
  totalPrice: number;
  stripeAccountId?: string;
  favorites: ProductDocument[];
}

const User = mongoose.model<UserDocument>("User", userSchema);

export { User, UserDocument, cartItemSchema, CartItem };
