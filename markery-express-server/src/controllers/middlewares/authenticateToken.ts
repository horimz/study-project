import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { keys } from "../../keys";
import { User, IUser } from "../../models/User";

// Extend express request interface
declare global {
  namespace Express {
    export interface Request {
      token: string;
      user: IUser;
    }
  }
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).send({ errorMessage: "Unauthorized." });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, keys.jwtSecret);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      return res.status(401).send({ errorMessage: "Invalid token." });
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(500).send();
  }
}
