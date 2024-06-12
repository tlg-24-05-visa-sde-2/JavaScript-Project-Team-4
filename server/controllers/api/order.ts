import { Router, Request, Response } from "express";
import { User, UserDocument } from "../../models/user";
import { Order, OrderDocument } from "../../models/order";
import { Product, ProductDocument } from "../../models/product";
import authenticateUser, {
  AuthenticatedRequest,
} from "../../middleware/AuthMiddleware";

import dotenv from "dotenv";
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_TEST, {
  apiVersion: "2023-10-16",
});

const router: Router = Router();

router.post(
  "/create-order",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user._id;

      // Retrieve user
      const user: UserDocument | null = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Calculate total amount and prepare order items from the user's shopping cart
      let totalAmount = 0;
      const orderItems = user.cart.map((item) => {
        const orderItem = {
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        };
        totalAmount += item.quantity * item.product.price;
        return orderItem;
      });

      if (orderItems.length === 0) {
        return res.status(400).json({ message: "Shopping cart is empty" });
      }

      // Create order
      const order = new Order({
        user: user._id,
        items: orderItems,
        totalAmount: totalAmount,
        status: "pending",
      });

      await order.save();

      // Clear the shopping cart
      user.cart = [];
      await user.save();

      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100, // amount in cents
        currency: "usd",
        payment_method_types: ["card"],
        metadata: { orderId: order._id.toString() },
      });

      res.json({
        client_secret: paymentIntent.client_secret,
        orderId: order._id,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).send({ error: error.message });
    }
  }
);

export default router;
