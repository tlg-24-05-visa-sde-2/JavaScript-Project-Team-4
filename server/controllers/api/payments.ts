require("dotenv").config();
import { Router, Request, Response } from "express";
import { User } from "../../models/user";
import authenticateUser, { AuthenticatedRequest } from "../../middleware/AuthMiddleware";

const stripe = require("stripe")(process.env.STRIPE_TEST, {
  apiVersion: "2023-10-16",
});

const router: Router = Router();

router.post("/account_session", async (req, res) => {
  try {
    const { account } = req.body;

    const accountSession = await stripe.accountSessions.create({
      account: account,
      components: {
        account_onboarding: { enabled: true },
      },
    });

    res.json({
      client_secret: accountSession.client_secret,
    });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account session",
      error
    );
    res.status(500);
    res.send({ error: error.message });
  }
});

router.post("/account", authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId  = req.user._id;
  
      const account = await stripe.accounts.create({
        type: 'express',
      });
  
      // Save the account ID to the user in the database
      const user = await User.findByIdAndUpdate(userId, { stripeAccountId: account.id }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ account: account.id });
    } catch (error) {
      console.error("Error creating Stripe account:", error);
      res.status(500).send({ error: error.message });
    }
  });

export default router;
