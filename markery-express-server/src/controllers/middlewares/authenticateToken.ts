import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { keys } from '../../keys';
import { User, IUser } from '../../models/User';

// Extend express request interface
declare global {
  namespace Express {
    export interface Request {
      token: string;
      user: IUser;
    }
  }
}

// Find and verify token in header
export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get headers authorization field
    const authHeader = req.header('Authorization');
    if (!authHeader) throw new Error('Authorization header is missing.');

    // Get token in header
    const token = authHeader.replace('Bearer ', '');

    // Decode and verify token
    const decoded: any = jwt.verify(token, keys.jwtSecret);

    // Find user based on decoded token
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    });
    if (!user) throw new Error('Cannot find user.');

    // Store user and token information in request object
    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send(false);
  }
}
