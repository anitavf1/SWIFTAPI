import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  name: string;
  duration: number;
  compositor: string;
  lyricist: string;
  producer: string;
}

const SongSchema: Schema = new Schema({
  name: { type: String, required: true },
  album: { type: String, required: true },
  compositor: { type: String, required: true },
  lyricist: { type: String, required: true },
  producer: { type: Number, required: true }
});

export default mongoose.model<ISong>("Song", SongSchema);
