import { Request, Response } from "express";
import Song, { ISong } from "../Models/songs";
import dotenv from "dotenv";

export interface CustomReq extends Request {
    user: ISong;
}

dotenv.config();

export const createSong = async (req: Request, res: Response) => {
    const { name, album, composer, lyricist, producer } = req.body;

    try {
        const song = new Song({ name, album, composer, lyricist, producer});
        await song.save();   
        res.status(201)
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const deleteSong = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const song = await Song.findByIdAndDelete(id);

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json({ message: "Song deleted with success" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the song. Try again." });
    }
};

export const updateSong = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {name, album, composer, lyricist, producer } = req.body;
    
    try {
        const updatedSong = await Song.findByIdAndUpdate(
            id,
            {name, album, composer, lyricist, producer},
            { new: true, runValidators: true }  
        );

        if (!updatedSong) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json(updatedSong);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the song" });
    }
};


export const getSongDetails = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const song = await Song.findById(id);

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the song details" });
    }
};
