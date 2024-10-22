import { Request, Response } from "express";
import Album, { IAlbum } from "../Models/album";
import redis from 'redis';
import { promisify } from 'util';
import dotenv from "dotenv";
import album from "../Models/album";
import {redisClient} from '../index.ts';

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

export const updateProperties = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const updatedAlbum = await album.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedAlbum) {
            res.status(404).json({ message: "Album not found" });
        }

        res.status(200).json(updatedAlbum);
    } catch (err) {
        res.status(500).json({error: err})
    }
}


export const getAlbumDetails = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
       
        const cachedAlbum = await redisClient.get(`album:${id}`);
        if (cachedAlbum) {
            return res.status(200).json(JSON.parse(cachedAlbum));
        }

        
        const album = await Album.findById(id);
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

    
        await redisClient.setEx(`album:${id}`, 3600, JSON.stringify(album)); 

        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the album details" });
    }
};


export const getAlbums = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, releaseDate } = req.query;
    
    
    const cacheKey = `albums:${releaseDate}:page:${page}:limit:${limit}`;

    try {
       
        const cachedAlbums = await redisClient.get(cacheKey);

        if (cachedAlbums) {
            
            return res.status(200).json({ albums: JSON.parse(cachedAlbums) });
        }

        
        const albums = await album.find({
            releaseDate: releaseDate
        }, null, {
            skip: (Number(page) - 1) * Number(limit),
            limit: Number(limit)
        });

        
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(albums)); 

        
        res.status(200).json({ albums });

    } catch (err) {
       
        res.status(500).json({ err });
    }
};
