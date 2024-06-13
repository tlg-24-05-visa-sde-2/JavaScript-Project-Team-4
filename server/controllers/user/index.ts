import express from 'express';
const router = express.Router();

import authRoutes from './auth';
import userRoutes from './user';
import shoppingCartRoutes from './shoppingCart';

router.use("/", userRoutes);
router.use("/auth", authRoutes);
router.use("/cart", shoppingCartRoutes);

export default router;