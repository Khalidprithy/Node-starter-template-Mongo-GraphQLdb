import { sign } from 'jsonwebtoken';
import config from '../config';

export const createRefreshToken = (userEmail: string): string => {
   const refreshToken = sign({ userEmail }, config.jwtSecretRefresh, {
      expiresIn: '7d' // Set the desired expiration time
   });
   return refreshToken;
};
