import mongoose, { Schema, Document, Model } from 'mongoose';
import { Url } from './Url';

export interface IFolder extends Document {
  folderName: string;
}

export interface IFolderModel extends Model<IFolder> {
  // static methods
  findAllFolders(owner: string): Document[];
  findAllContent(owner: string): Document[];
  deleteFolders(folders: { _id: string }[]): void;
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
      ref: 'User' // foreign key
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

folderSchema.virtual('urls', {
  ref: 'Url',
  localField: '_id',
  foreignField: 'owner'
});

folderSchema.virtual('folders', {
  ref: 'Folder',
  localField: '_id',
  foreignField: 'owner'
});

folderSchema.statics.findAllFolders = async (owner: string) => {
  const folders = await Folder.find({ owner });
  return folders;
};

folderSchema.statics.findAllContent = async (owner: string) => {
  const folders = await Folder.find({ owner });
  const urls = await Url.find({ owner });
  return { folders, urls };
};

folderSchema.statics.deleteFolders = async (folders: { _id: string }[]) => {
  for (const folder of folders) {
    const folderToDelete = await Folder.findOne({ _id: folder._id });
    if (!folderToDelete) throw new Error('Failed to find folder document.');
    await folderToDelete.remove();
  }
};

folderSchema.pre('remove', async function(next) {
  const folder = this;
  await Folder.deleteMany({ owner: folder._id }); // delete all sub folders
  await Url.deleteMany({ owner: folder._id }); // delete all urls under the folder
  next();
});

export const Folder: IFolderModel = mongoose.model<IFolder, IFolderModel>(
  'Folder',
  folderSchema
);
