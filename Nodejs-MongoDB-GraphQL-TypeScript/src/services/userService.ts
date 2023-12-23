// src/services/userService.ts
import User, { CreateUserInput, IUser } from '../models/User';

export const createUser = async (userData: CreateUserInput): Promise<IUser> => {
   return User.create(userData);
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
   return User.findOne({ email });
};

export const updateUser = async (
   email: string,
   updateData: Partial<CreateUserInput>
): Promise<IUser | null> => {
   return User.findOneAndUpdate({ email }, updateData, { new: true });
};

export const deleteUser = async (email: string): Promise<boolean> => {
   const result = await User.deleteOne({ email });
   return result.deletedCount === 1;
};
