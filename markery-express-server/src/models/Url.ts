import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUrl extends Document {
  // Fields
  url: string;
  alias: string;
  description: string;
}

export interface IUrlModel extends Model<IUrl> {
  // Static methods
  findAllUrls(owner: string): Document[];
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

/* Static methods */

urlSchema.statics.findAllUrls = async (owner: string) => {
  const urls = await Url.find({ owner });
  return urls;
};

export const Url: IUrlModel = mongoose.model<IUrl, IUrlModel>('Url', urlSchema);
