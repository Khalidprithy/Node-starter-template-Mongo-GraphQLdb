import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (userId: string): string => {
   return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): string | object => {
   try {
      return jwt.verify(token, config.jwtSecret);
   } catch (error) {
      throw new Error('Invalid token');
   }
};
