import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUrl extends Document {
  url: string;
  name: string;
  description: string;
}

export interface IUrlModel extends Model<IUrl> {
  deleteUrls(urls: { _id: string }[]): void;
}

const urlSchema: Schema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    name: {
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

urlSchema.statics.deleteUrls = async (urls: { _id: string }[]) => {
  for (const url of urls) {
    const urlToDelete = await Url.findOne({ _id: url._id });
    if (!urlToDelete) throw new Error('Failed to find url document.');
    urlToDelete.remove();
  }
};

export const Url: IUrlModel = mongoose.model<IUrl, IUrlModel>('Url', urlSchema);
