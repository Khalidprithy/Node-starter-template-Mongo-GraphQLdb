// UserResolver.ts
import * as bcrypt from 'bcrypt';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
   createUser,
   deleteUser,
   findUserByEmail,
   updateUser
} from '../services/userService';
import { generateToken } from '../utils/generateToken';

@Resolver()
export class UserResolver {
   @Query(() => String)
   hello(): string {
      return 'Hello, World!';
   }

   @Mutation(() => String)
   async register(
      @Arg('name') name: string,
      @Arg('password') password: string,
      @Arg('email') email: string,
      @Arg('role') role: string,
      @Arg('image') image: string
   ): Promise<string> {
      try {
         // Check if the email already exists
         const existingUser = await findUserByEmail(email);
         if (existingUser) {
            throw new Error('Email already exists');
         }

         // Hash the password
         const hashedPassword = await bcrypt.hash(password, 10);

         // Generate and return a token
         const token = generateToken(email);

         // Create a new user with additional fields
         const newUser = await createUser({
            name,
            password: hashedPassword,
            email,
            role,
            image,
            refreshToken: token
         });

         // Log the successful registration
         console.log('User registered:', newUser);

         return token;
      } catch (error) {
         console.error(error);
         throw new Error('Internal Server Error');
      }
   }

   @Mutation(() => String)
   async login(
      @Arg('email') email: string,
      @Arg('password') password: string
   ): Promise<string> {
      try {
         // Find the user by email
         const user = await findUserByEmail(email);
         if (!user) {
            throw new Error('User not found');
         }

         // Compare the provided password with the hashed password in the database
         const passwordMatch = await bcrypt.compare(password, user.password);
         if (!passwordMatch) {
            throw new Error('Incorrect password');
         }

         // Generate and return a new token
         const token = generateToken(email);

         await updateUser(email, { refreshToken: token });

         // Log the successful login
         console.log('User logged in:', user);

         return token;
      } catch (error) {
         console.error(error);
         throw new Error('Login failed');
      }
   }

   @Mutation(() => Boolean)
   async logout(@Arg('email') email: string): Promise<boolean> {
      try {
         // Perform logout logic
         // For simplicity, let's assume you have a function to update refreshToken
         const updatedUser = await updateUser(email, { refreshToken: '' });

         // Check if the user was successfully updated
         if (updatedUser) {
            console.log('User logged out:', email);
            return true;
         } else {
            throw new Error('Failed to update user during logout');
         }
      } catch (error) {
         console.error(error);
         throw new Error('Logout failed');
      }
   }

   @Mutation(() => Boolean)
   async updateProfile(
      @Arg('email') email: string,
      @Arg('name') name: string,
      @Arg('role') role: string,
      @Arg('image') image: string
   ): Promise<boolean> {
      try {
         // Update profile logic
         const updatedUser = await updateUser(email, { name, role, image });
         return !!updatedUser;
      } catch (error) {
         console.error(error);
         throw new Error('Failed to update profile');
      }
   }

   @Mutation(() => Boolean)
   async deleteProfile(@Arg('email') email: string): Promise<boolean> {
      try {
         // Delete profile logic
         const deleted = await deleteUser(email);
         return deleted;
      } catch (error) {
         console.error(error);
         throw new Error('Failed to delete profile');
      }
   }
}
