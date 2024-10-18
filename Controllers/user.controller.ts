import { Request, Response } from "express";
import User, { IUser } from "../Models/user";
import Album from "../Models/album";
import dotenv from "dotenv";

export interface CustomReq extends Request {
    user: IUser;
}

dotenv.config();

export const createUser = async (req: Request, res: Response) => {
    const { name, email, charge, password } = req.body;

    try {
        const user = new User({ name, email, charge, password});
        await user.save();
        res.status(201).json({ id: user._id });
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ id: user._id });
    } catch (error) {
        res.status(500).json({ error});
    }
};

export const getUserInfo = async (req: CustomReq, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};