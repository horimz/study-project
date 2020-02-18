import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { keys } from '../../keys';
import { User, IUser } from '../../models/User';

// extend express request interface
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
    const authHeader = req.header('Authorization');

    if (!authHeader) throw new Error('Authorization header is missing.');

    const token = authHeader.replace('Bearer ', '');
    const decoded: any = jwt.verify(token, keys.jwtSecret);

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    });

    if (!user) throw new Error('Cannot find user.');

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send(false);
  }
}
