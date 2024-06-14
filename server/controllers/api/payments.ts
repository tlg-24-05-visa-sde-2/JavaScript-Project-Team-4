require("dotenv").config();
import { Router, Request, Response } from "express";
import { User, CartItem } from "../../models/user";
import authenticateUser, {
  AuthenticatedRequest,
} from "../../middleware/AuthMiddleware";

const stripe = require("stripe")(
  "sk_test_51PQub32Kq7ZuBPIY3OIoyV6MRArUtuTMOr5hZf3LBDjmmX2gjDcy6zDgvygtFXgdTAz5q7OQMeRNTorGVHnbiLe500SO6tJaAa"
);

const router: Router = Router();

let url: string;

if (process.env.NODE_ENV === "development") {
  url = "http://localhost:3001";
} else {
  url = "https://hometownharvest-91162a140111.herokuapp.com";
}

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

router.post(
  "/account",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user._id;

      const account = await stripe.accounts.create();

      // Save the account ID to the user in the database
      const user = await User.findByIdAndUpdate(
        userId,
        { stripeAccountId: account.id },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ account: account.id });
    } catch (error) {
      console.error("Error creating Stripe account:", error);
      res.status(500).send({ error: error.message });
    }
  }
);


router.post('/create-checkout-session', authenticateUser, async (req: AuthenticatedRequest, res) => {
  const userCart = req.user.cart;
  let lineItems = [];
  for (let i = 0; i < userCart.length; i++) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: userCart[i].product.name,
        },
        unit_amount: userCart[i].product.price * 100,
      },
      quantity: userCart[i].quantity,
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: `https://hometownharvest-91162a140111.herokuapp.com/checkout/return?session_id={CHECKOUT_SESSION_ID}`
  });

  res.send({clientSecret: session.client_secret});
});


router.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id as string
  );

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

export default router;
