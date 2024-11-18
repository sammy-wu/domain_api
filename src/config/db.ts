import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Listing } from '../models/Listing';
import { SavedListing } from '../models/SavedListing';

dotenv.config();
export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Listing, SavedListing],
  synchronize: true,
  logging: false,
});
export default dataSource;
