import mongoose, { Schema, Document, Model } from 'mongoose';
import { Url } from './Url';

export enum FolderTypes {
  root,
  normal
}

export interface IFolder extends Document {
  // Fields
  folderName: string;
  type: FolderTypes;
}

export interface IFolderModel extends Model<IFolder> {
  // Static methods
  findRootFolder(owner: string): Document;
  findAllFolders(owner: string): Document[];
}

const folderSchema: Schema = new mongoose.Schema(
  {
    folderName: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User'
    },
    parentFolderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Folder'
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

// Virtual property which connects two models
folderSchema.virtual('urls', {
  ref: 'Url',
  localField: '_id',
  foreignField: 'owner'
});

// Virtual property which connects two models
folderSchema.virtual('folders', {
  ref: 'Folder',
  localField: '_id',
  foreignField: 'parentFolderId'
});

/* Static methods */

folderSchema.statics.findRootFolder = async (owner: string) => {
  const folder = await Folder.findOne({ owner, type: FolderTypes.root });
  return folder;
};

folderSchema.statics.findAllFolders = async (parentFolderId: string) => {
  const folders = await Folder.find({ parentFolderId });
  return folders;
};

// Delete all sub folders and urls when folder is removed
folderSchema.pre('remove', async function(next) {
  const folder = this;

  // Delete all sub folders
  await Folder.deleteMany({ parentFolderId: folder._id });

  // Delete all urls
  await Url.deleteMany({ owner: folder._id });
  next();
});

export const Folder: IFolderModel = mongoose.model<IFolder, IFolderModel>(
  'Folder',
  folderSchema
);
