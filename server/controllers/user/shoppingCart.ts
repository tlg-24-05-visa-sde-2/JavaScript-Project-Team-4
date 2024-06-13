import { Router, Request, Response } from "express";
var jwt = require("jsonwebtoken");
import { User, UserDocument, cartItemSchema, CartItem} from "../../models/user";
import { Product, ProductDocument } from "../../models/product";
import dotenv from "dotenv";
import authenticateUser, { AuthenticatedRequest }  from "../../middleware/AuthMiddleware";
import CartHelper from "../../utils/CartHelper";
dotenv.config();

const router: Router = Router();

router.post('/addToCart/:productId', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    const userId: any = req.user._id;
    const { productId } = req.params;
    const quantity = parseInt(req.query.quantity as string); // Convert quantity to a number

    try {
        const user: UserDocument | null = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product: ProductDocument | null = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItem: CartItem = {
            product: product,
            quantity: quantity
        }

        // Push the cart item object
        user.cart.push(cartItem);

        // Update the cart total price
        user.totalPrice = CartHelper.calculateTotal(user.cart);

        await user.save();

        res.status(200).json({ message: 'Product added to shopping cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to shopping cart', error });
    }
});

router.delete('/removeFromCart/:productId', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    const productId: any = req.params.productId;
    const userId: any = req.user._id;

    try {
        const user: UserDocument = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the index of the product in the cart
        const productIndex: number = user.cart.findIndex((item: CartItem) => item.product._id == productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Remove the product from the cart
        user.cart.splice(productIndex, 1);

        // Update the cart total price
        user.totalPrice = CartHelper.calculateTotal(user.cart);

        await user.save();

        res.status(200).json({ message: 'Product removed from shopping cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from shopping cart', error });
    }
}); 


router.patch('/updateCart/:productId', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    const productId: any = req.params.productId;
    const userId: any = req.user._id;
    const quantity = parseInt(req.query.quantity as string); // Convert quantity to a number

    try {
        const user: UserDocument = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the index of the product in the cart
        const productIndex: number = user.cart.findIndex((item: CartItem) => item.product._id == productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Update the quantity of the product
        user.cart[productIndex].quantity = quantity;

        // Update the cart total price
        user.totalPrice = CartHelper.calculateTotal(user.cart);

        await user.save();

        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
});

export default router;