import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { keys } from "../keys";
import { Folder } from "./Folder";

/* Types */

export interface Token {
  token: string;
}

export interface IUser extends Document {
  username?: string;
  email?: string;
  description?: string;
  password?: string;
  tokens?: Token[];
  avatar?: Buffer;
}

export interface UserDocument extends IUser {
  generateAuthToken: Function;
}

export interface UserModel extends Model<UserDocument> {
  findByCredentials(email: string, password: string): UserDocument;
}

/* Schema */

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 2,
      validate(value: string) {
        if (value.length < 2) {
          throw new Error("Username must be longer than two characters.");
        }
        return true;
      }
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format.");
        }
        return true;
      }
    },
    description: String,
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
      validator(value: string) {
        if (value.length < 8) {
          throw new Error("Password must be longer than eight characters.");
        }
        return true;
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: Buffer
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

userSchema.virtual("folders", {
  ref: "Folder",
  localField: "_id",
  foreignField: "owner"
});

/* Methods */

userSchema.methods.generateAuthToken = async function() {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, keys.jwtSecret);

  // Add generated token to users tokens list
  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

/* Static methods */

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user || !user.password)
    throw new Error("Incorrect email. Please check your email.");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    throw new Error("Incorrect password. Please check your password.");

  return user;
};

// Hash plain text before saving (cannot use arrow function)
userSchema.pre("save", async function(next) {
  const user: any = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete all folders when user is removed
userSchema.pre("remove", async function(next) {
  const user = this;

  // Find users root folder
  const usersRootFolder = await Folder.findOne({ owner: user._id });

  if (!usersRootFolder) throw new Error("Failed to find users root folder.");

  // Remove users root folder
  // All subfolders will be deleted
  await usersRootFolder.remove();
  next();
});

export const User: UserModel = mongoose.model<UserDocument, UserModel>(
  "User",
  userSchema
);
