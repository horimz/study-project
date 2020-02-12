import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { keys } from '../keys';
import { Folder } from './Folder';

export interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
      // validate(value) {
      //   if (!validator.isEmail(value)) {
      //     throw new Error('Email is invalid');
      //   }
      // }
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
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
      type: Buffer // binary data to store images
    }
  },
  {
    timestamps: true // timestamps default value is false if not set
  }
);

// virtual property (connecting two models)
userSchema.virtual('folders', {
  ref: 'Folder',
  localField: '_id',
  foreignField: 'owner'
});

// userSchema.methods are for individual users
// userSchema statics are for all users

// Add a custom function for a specific user
userSchema.methods.generateAuthToken = async function() {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, keys.jwtSecret);

  user.tokens = user.tokens.concat({ token }); // concat token to user info
  await user.save();

  return token;
};

// hiding private data for each individual user (called for each user fetch)
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

// custom function
userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// hash the plain text password before saving (cannot use arrow function syntax)
userSchema.pre('save', async function(next) {
  const user: any = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// delete all folders when user is removed
userSchema.pre('remove', async function(next) {
  const user = this;
  await Folder.deleteMany({ owner: user._id });
  next();
});

export const User = mongoose.model<UserInterface>('User', userSchema);
