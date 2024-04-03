import { RequestHandler } from 'express';
import { createBackup } from '../controllers/brands.controller';
import  dotenv  from 'dotenv';
// Middleware function to create a backup before transformation
export const BackupData: RequestHandler = async (req, res, next) => {
    const dbNAMEString : string|undefined = process.env.DB_name
    const collectionString : string|undefined = process.env.Collection
    const backupDirString : string|undefined = process.env.BackupDir
  // Exit early if DB_STRING is not defined
  if (!dbNAMEString) {
    console.error('DB_Name environment variable is not defined');
    return;
  }
  if (!collectionString) {
    console.error('collection String environment variable is not defined');
    return;
  }
  if (!backupDirString) {
    console.error('backupDir String environment variable is not defined');
    return;
  }
    const database = dbNAMEString; // MongoDB database name
    const collection = collectionString; // MongoDB collection name
    const backupDir = backupDirString; // Backup directory path
    try {
        // Create a backup before proceeding with transformation
        await createBackup(database, collection, backupDir);
        
        // Proceed with the next middleware or route handler
        next();
    } catch (error) {
        // Handle backup error
        res.status(500).json({ error: 'Failed to create backup' });
    }
};
