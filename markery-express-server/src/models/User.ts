import mongoose, { Schema, Document, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { keys } from '../keys';
import { Folder } from './Folder';

export interface IToken {
  token: string;
}

export interface IUser extends Document {
  // Fields
  username?: string;
  email?: string;
  description?: string;
  password?: string;
  tokens?: IToken[];

  // Methods
  generateAuthToken?: Function;
}

export interface IUserModel extends Model<IUser> {
  // Static methods
  findByCredentials(email: string, password: string): Document;
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) throw new Error('Email is invalid.');
        return true;
      }
    },
    description: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      trim: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      // Binary data to store images
      type: Buffer
    }
  },
  {
    // Timestamps default value is false
    timestamps: true,
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    }
  }
);

// Virtual property which connects two models
userSchema.virtual('folders', {
  ref: 'Folder',
  localField: '_id',
  foreignField: 'owner'
});

// Custom method
userSchema.methods.generateAuthToken = async function() {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, keys.jwtSecret);

  user.tokens = user.tokens.concat({ token }); // concat token to user info
  await user.save();

  return token;
};

// Truncates sensitive data when "toJSON()" method is called
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

// Static method
userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });
  if (!user || !user.password) throw new Error('Unable to login');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Unable to login');

  return user;
};

// Hash plain text before saving (cannot use arrow function)
userSchema.pre('save', async function(next) {
  const user: any = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete all folders when user is removed
userSchema.pre('remove', async function(next) {
  const user = this;

  // Find users root folder
  const usersRootFolder = await Folder.findOne({ owner: user._id });
  if (!usersRootFolder) throw new Error('Failed to find users root folder.');

  // Remove users root folder
  await usersRootFolder.remove();
  next();
});

export const User: IUserModel = mongoose.model<IUser, IUserModel>(
  'User',
  userSchema
);
