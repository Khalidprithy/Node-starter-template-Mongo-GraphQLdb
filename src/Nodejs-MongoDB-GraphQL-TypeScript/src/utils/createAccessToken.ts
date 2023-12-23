import { sign } from 'jsonwebtoken';
import config from '../config';

export const createAccessToken = (userEmail: string): string => {
   const accessToken = sign({ userEmail }, config.jwtSecretAccess, {
      expiresIn: '15m' // Set the desired expiration time
   });
   return accessToken;
};
