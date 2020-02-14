import mongoose, { Schema, Document } from 'mongoose';
import { Url } from './Url';

export interface IFolder extends Document {
  folderName: string;
}

const folderSchema: Schema = new mongoose.Schema(
  {
    folderName: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' // works like a foreign key
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

// virtual property (connecting two models)
folderSchema.virtual('urls', {
  ref: 'Url',
  localField: '_id',
  foreignField: 'owner'
});

// delete all urls when folder is removed
folderSchema.pre('remove', async function(next) {
  const folder = this;
  await Url.deleteMany({ owner: folder._id });
  next();
});

export const Folder = mongoose.model<IFolder>('Folder', folderSchema);
