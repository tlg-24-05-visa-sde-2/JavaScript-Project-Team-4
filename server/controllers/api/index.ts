import express, { Router } from 'express';
const router: Router = express.Router();

import productRoutes from './products';
import paymentRoutes from './payments';

router.use("/products", productRoutes);
router.use("/payments", paymentRoutes);

export default router;