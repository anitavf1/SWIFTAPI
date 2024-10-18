import { Request, Response } from "express";
import Album, { IAlbum } from "../Models/album";
import dotenv from "dotenv";

export interface CustomReq extends Request {
    user: IAlbum;
}

dotenv.config();

export const createAlbum = async (req: Request, res: Response) => {
    const { album, artist, realeaseDate, songs } = req.body;

    try {
        const user = new Album({ album, artist, realeaseDate, songs});
        await user.save();   
        res.status(201)
    } catch (error) {
        res.status(400).json({ error });
    }
};



export const deleteAlbum = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const album = await Album.findByIdAndDelete(id);

        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.status(200).json({ message: "Album deleted with success" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting album. Try again." });
    }
};

export const updateAlbum = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { album, artist, realeaseDate, songs } = req.body;

    try {
        const updatedAlbum = await Album.findByIdAndUpdate(
            id,
            { album, artist, realeaseDate, songs },
            { new: true, runValidators: true }  
        );

        if (!updatedAlbum) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.status(200).json(updatedAlbum);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the album" });
    }
};

export const getAlbumDetails = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const album = await Album.findById(id);

        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the album details" });
    }
};
