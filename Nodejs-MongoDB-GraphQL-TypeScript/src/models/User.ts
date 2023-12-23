// src/models/User.ts
import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
   name: string;
   password: string;
   email: string;
   role: string;
   image: string;
   refreshToken: string;
}

export interface CreateUserInput {
   name: string;
   password: string;
   email: string;
   role: string;
   image: string;
   refreshToken: string;
}

const userSchema = new Schema<IUser>({
   name: { type: String, required: true },
   password: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   role: { type: String, required: true },
   image: { type: String, required: true },
   refreshToken: { type: String, required: true, unique: true }
});

export default model<IUser>('User', userSchema);
