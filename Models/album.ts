import mongoose, { Document, Schema } from 'mongoose';

export interface IAlbum extends Document {
  album: string;
  artist: string;
  releaseDate: string;
  songs:string;
}

const AlbumSchema: Schema = new Schema({
  album: { type: String, required: true },
  artist: { type: String, required: true },
  realeaseDate: { type: String, required: true },
  songs: { type: String, required: true },
  
});

export default mongoose.model<IAlbum>("Album", AlbumSchema, "album");