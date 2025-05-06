import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const EMAIL_ID = process.env.EMAIL_ID;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const SECRET_KEY = process.env.SECRET_KEY;