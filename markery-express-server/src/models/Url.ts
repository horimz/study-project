import mongoose, { Schema, Document, Model, mongo } from "mongoose";

export interface IUrl extends Document {
  url: string;
  alias: string;
  description: string;
  owner: mongoose.Schema.Types.ObjectId;
  parentFolderId?: mongoose.Schema.Types.ObjectId;
}

export interface UrlDocument extends IUrl {}

export interface IUrlModel extends Model<IUrl> {
  findAllUrls(owner: string): UrlDocument[];
  findAllUrlsInFolder(owner: string, parentFolderId: string): UrlDocument[];
}

const urlSchema: Schema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    alias: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    parentFolderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Folder"
    }
  },
  {
    timestamps: true,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000
    }
  }
);

/* Static methods */

urlSchema.statics.findAllUrls = async (owner: string) => {
  const urls = await Url.find({ owner });
  return urls;
};

urlSchema.statics.findAllUrlsInFolder = async (
  owner: string,
  parentFolderId: string
) => {
  const urls = await Url.find({ owner, parentFolderId });
  return urls;
};

export const Url: IUrlModel = mongoose.model<IUrl, IUrlModel>("Url", urlSchema);
