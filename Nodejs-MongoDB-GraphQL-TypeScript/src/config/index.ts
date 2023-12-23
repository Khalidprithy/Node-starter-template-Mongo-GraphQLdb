import * as dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI, JWT_SECRET, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } =
   process.env;

export default {
   mongodbUri: MONGODB_URI || 'mongodb://localhost:27017/your-database-name',
   jwtSecret: JWT_SECRET || '12312',
   jwtSecretAccess: JWT_ACCESS_SECRET || '123',
   jwtSecretRefresh: JWT_REFRESH_SECRET || '1523',
   BCRYPT_SALT_ROUNDS: 10
};
