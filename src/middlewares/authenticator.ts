import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

// Middleware to verify JWT token
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded; // Attach user payload to request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
