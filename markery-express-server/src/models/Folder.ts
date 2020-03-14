import mongoose, { Schema, Document, Model } from 'mongoose';
import { Url } from './Url';

/* Types */

export enum FolderTypes {
  root,
  normal
}

export interface IFolder extends Document {
  folderName: string;
  type: FolderTypes;
  owner: mongoose.Schema.Types.ObjectId;
  parentFolderId?: mongoose.Schema.Types.ObjectId;
}

export interface FolderDocument extends IFolder {}

export interface FolderModel extends Model<IFolder> {
  findRootFolder(owner: string): FolderDocument;
  findAllFolders(owner: string): FolderDocument[];
  findAllSubFoldersInFolder(
    owner: string,
    parentFolderId: string
  ): FolderDocument[];
}

/* Schema */

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
    // The owner of the folder (user)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    // Folders are contained in a folder
    // However, *root folders* do not have a parent folder
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

folderSchema.virtual('urls', {
  ref: 'Url',
  localField: '_id',
  foreignField: 'owner'
});

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

folderSchema.statics.findAllFolders = async (owner: string) => {
  const folders = await Folder.find({ owner, type: FolderTypes.normal });

  return folders;
};

folderSchema.statics.findAllSubFoldersInFolder = async (
  owner: string,
  parentFolderId: string
) => {
  const folders = await Folder.find({
    owner,
    parentFolderId,
    type: FolderTypes.normal
  });

  return folders;
};

// Delete all sub folders and urls when folder is removed
folderSchema.pre('remove', async function(next) {
  const folder = this;

  await Folder.deleteMany({ parentFolderId: folder._id });

  await Url.deleteMany({ parentFolderId: folder._id });

  next();
});

export const Folder: FolderModel = mongoose.model<IFolder, FolderModel>(
  'Folder',
  folderSchema
);
