
import { Response, NextFunction } from "express";
import User from "../Models/user";
import { CustomReq } from "../Controllers/user.controller";

export const authMiddleware = async ( req: CustomReq, res: Response, next: NextFunction) => {
    const userId = req.header("Authorization");
  

    if (!userId) {
        return res.status(401).json({ error: "Access denied. No user ID provided." });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ error: "User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error });
    }
};