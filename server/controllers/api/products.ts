import { Router, Request, Response } from "express";
import { Product, ProductDocument } from "../../models/product";
import authenticateUser, {
  AuthenticatedRequest,
} from "../../middleware/AuthMiddleware";
import dotenv from "dotenv";
dotenv.config();

const router: Router = Router();

// Get all products
router.get(
  "/allProducts",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const products: ProductDocument[] = await Product.find();
      res.status(200).json({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: `Internal server error ${error}` });
    }
  }
);

// Get a single product
router.get(
    "/:productId",
    async (req: Request, res: Response): Promise<any> => {
        try {
            const productId: string = req.params.productId;
            const product: ProductDocument | null = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            res.status(200).json({ product });
        } catch (error) {
            console.error("Error fetching product:", error);
            res.status(500).json({ error: `Internal server error ${error}` });
        }
    }
);

// Add a product
router.post(
  "/addProduct",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { name, description, price, image, quantityAvailable, tags } =
        req.body;

      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const sellersLocation: string = `${req.user.city}, ${req.user.state}`;
      const sellersName: string = req.user.username as string;
      const user: any = req.user._id;

      // Validate required fields
      if (!name || !description || !price || !image || !quantityAvailable) {
        return res
          .status(400)
          .json({ error: "All fields except tags are required." });
      }

      // Create a new product
      const newProduct = new Product({
        name,
        description,
        price,
        image,
        quantityAvailable,
        sellersName,
        sellersLocation,
        tags,
        user, // Correct field name
      });

      // Save the product to the database
      const savedProduct: any = await newProduct.save();

      // Return the saved product
      res.status(201).json({
        message: "Product created successfully",
        product: savedProduct,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: `Internal server error ${error}` });
    }
  }
);

// Update a product
router.put(
    "/updateProduct/:productId",
    authenticateUser,
    async (req: AuthenticatedRequest, res: Response) => {
        try {
            const productId: string = req.params.productId;

            if (!req.user) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const product: ProductDocument | null = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            if (product.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Forbidden" });
            }

            const { name, description, price, image, quantityAvailable, tags } =
                req.body;

            // Validate required fields
            if (!name || !description || !price || !image || !quantityAvailable) {
                return res
                    .status(400)
                    .json({ error: "All fields except tags are required." });
            }

            // Update the product
            product.name = name;
            product.description = description;
            product.price = price;
            product.image = image;
            product.quantityAvailable = quantityAvailable;
            product.tags = tags;

            const updatedProduct: ProductDocument = await product.save();

            res.status(200).json({
                message: "Product updated successfully",
                product: updatedProduct,
            });
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ error: `Internal server error ${error}` });
        }
    }
);

// Delete a product
router.delete(
  "/deleteProduct/:productId",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const productId: string = req.params.productId;

      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const product: ProductDocument | null = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await Product.deleteOne({ _id: productId });

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: `Internal server error ${error}` });
    }
  }
);

export default router;
