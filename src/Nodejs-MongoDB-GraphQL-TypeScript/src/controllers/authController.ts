// src/controllers/authController.ts
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { CreateUserInput } from '../models/User';
import { createUser, findUserByEmail } from '../services/userService';
import { generateToken } from '../utils/generateToken';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({ email, password: hashedPassword } as CreateUserInput);

    const token = generateToken(newUser._id);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
