import mongoose, { Schema, Document } from 'mongoose';

export interface IUrl extends Document {
  url: string;
  description: string;
}

const urlSchema: Schema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Folder' // works like a foreign key
    }
  },
  {
    timestamps: true,
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    }
  }
);

export const Url = mongoose.model<IUrl>('Url', urlSchema);
