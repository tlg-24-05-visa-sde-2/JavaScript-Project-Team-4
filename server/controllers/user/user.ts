import { Router, Request, Response } from "express";
var jwt = require("jsonwebtoken");
import { User, UserDocument } from "../../models/user";
import { Product, ProductDocument } from "../../models/product";
import dotenv from "dotenv";
import authenticateUser, { AuthenticatedRequest }  from "../../middleware/AuthMiddleware";
dotenv.config();

const router: Router = Router();

router.get("/userData", authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user._id; // Assuming req.user contains the user object with the _id
        const user: UserDocument | null = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data", error });
    }
});

router.post('/saveProduct/:productId', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    const userId: any = req.user._id;
    const { productId } = req.params; // Extract productId correctly

    try {
        const user: UserDocument | null = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product: ProductDocument | null = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Push the entire product object
        user.savedProducts.push(product);
        await user.save();

        res.status(200).json({ message: 'Product added to saved products', user });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to saved products', error });
    }
});

router.delete('/removeProduct/:productId', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    const  productId: any = req.params.productId;
    const userId: any = req.user._id;

    try {
        const user: UserDocument = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.savedProducts = user.savedProducts.filter(
            (product) => product._id.toString() !== productId
        );

        await user.save();

        res.status(200).json({ message: 'Product removed from saved products', user });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from saved products', error });
    }
});

router.put('/updateUser', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user._id;
    const { username, firstName, lastName, email, streetAddress, city, state, zip } = req.body;

    try {
        const user: UserDocument | null = await User.findByIdAndUpdate(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.streetAddress = streetAddress;
        user.city = city;
        user.state = state;
        user.zip = zip;

        await user.save();

        res.status(200).json({ message: 'User information updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user information', error });
    }
});

router.post('/addFavorite/:productId', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    const userId: any = req.user._id;
    const { productId } = req.params;
  
    try {
      const user: UserDocument | null = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const product: ProductDocument | null = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      user.favorites.push(product);
      await user.save();
  
      res.status(200).json({ message: 'Product added to favorites', user });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product to favorites', error });
    }
  });
  
  router.delete('/removeFavorite/:productId', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    const userId: any = req.user._id;
    const { productId } = req.params;
  
    try {
      const user: UserDocument | null = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.favorites = user.favorites.filter((id: any) => id.toString() !== productId);
      await user.save();
  
      res.status(200).json({ message: 'Product removed from favorites', user });
    } catch (error) {
      res.status(500).json({ message: 'Error removing product from favorites', error });
    }
  });

export default router;
