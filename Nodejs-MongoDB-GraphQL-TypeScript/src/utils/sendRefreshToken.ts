import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: string): void => {
   res.cookie('refresh-token', token, {
      httpOnly: true,
      path: '/refresh-token' // Set the correct path
   });
};
