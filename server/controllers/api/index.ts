import express from 'express';
const router = express.Router();

import productRoutes from './products';

router.use("/products", productRoutes);

export default router;