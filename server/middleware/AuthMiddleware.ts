import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User, UserDocument } from '../models/user'; // Adjust the path to your User model
require('dotenv').config();

export interface AuthenticatedRequest extends Request {
    user: any;
    body: any;
    params: {
      productId: string; // Adjust as per your route parameters
    };
    query: any;
    cookies: any;
}

const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        // Get the token from the 'HHT' cookie
        const token = req.cookies.HHT;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY) as { userId: string };

        // Find the user by ID
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Attach the user to the request object
        req.user = user;

        // Proceed to the next middleware/route handler
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ error: "Unauthorized" });
    }
};

export default authenticateUser;