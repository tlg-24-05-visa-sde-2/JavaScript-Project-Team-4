import express from 'express';
const router = express.Router();

import authRoutes from './auth';
import userRoutes from './user';

router.use("/auth", authRoutes);
router.use("/", userRoutes);

export default router;