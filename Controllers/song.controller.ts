import { Request, Response } from "express";
import Song, { ISong } from "../Models/songs";
import dotenv from "dotenv";
import { log } from "console";
import songs from "../Models/songs";
import {redisClient} from '../index';

export interface CustomReq extends Request {
    user: ISong;
}

dotenv.config();

export const getSongs = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, album } = req.query;

    const cacheKey = `songs:album:${album}:page:${page}:limit:${limit}`;

    try {
        
        const cachedSongs = await redisClient.get(cacheKey);

        if (cachedSongs) {
            
            return res.status(200).json({ songs: JSON.parse(cachedSongs) });
        }

        
        const songs = await Song.find(
            { album: album },
            null,
            {
                skip: (Number(page) - 1) * Number(limit),
                limit: Number(limit)
            }
        );

        
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(songs)); // Expira en 1 hora

        
        res.status(200).json({ songs });

    } catch (err) {
        
        res.status(500).json({ err });
    }
};

export const getSongById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const cacheKey = `song:${id}`;

    try {
        const cachedSong = await redisClient.get(cacheKey);

        if (cachedSong) {
            return res.status(200).json(JSON.parse(cachedSong));
        }

        const song = await Song.findById(id);

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        await redisClient.setEx(cacheKey, 3600, JSON.stringify(song)); // Expira en 1 hora

        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the song details" });
    }
};

export const createSong = async (req: Request, res: Response) => {
    const { name, album, compositor, lyricist, producer } = req.body;

    try {
        const song = new Song({ name, album, compositor, lyricist, producer });
        await song.save();
        res.status(201).json({ song });
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const createMultipleSongs = async(req: Request, res: Response) => {
    const { songs } = req.body;

    try {
        const createdSongs = await Song.insertMany(songs);

        res.status(201).json({createdSongs});
    } catch (err) {
        res.status(400).send({err});
    }
}

export const updateSong = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const { name, album, composer, lyricist, producer } = req.body;

    try {
        const updatedSong = await Song.findByIdAndUpdate(
            id,
            { name, album, composer, lyricist, producer },
            { new: true, runValidators: true }
        );

        if (!updatedSong) {
            res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json(updatedSong);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the song" });
    }
};

export const updateProperties = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const updatedSong = await Song.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedSong) {
            res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json(updatedSong);
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const deleteSong = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const song = await Song.findByIdAndDelete(id);

        if (!song) {
            res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json({ message: "Song deleted with success" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the song. Try again." });
    }
};

export const deleteAll = async (req: Request, res:Response) => {
    try{
        const deletedSongs = await Song.deleteMany();

        res.status(200).json({message: "Songs deleted", deletedSongs})
    } catch (err){
        res.status(400).json({err})
    }
}
