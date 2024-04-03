import mongoose from "mongoose";
import { AppError, catchError } from "../../utils/GlobalErrorHandler";
import BrandModel from "../Models/brands-schema";

import { exec } from 'child_process';
import { promisify } from 'util';
import { faker } from '@faker-js/faker';



/**
 * Retrieves all brands from the database.
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const GetBrands = catchError(async (req, res) => {

    // Fetch all brands from the database
    const Brands = await BrandModel.find();

    // Check if any brands were found
    if (!Brands || Brands.length === 0) {
        throw new AppError('No brands found', 404);
    }

    // Log the results and send a success response
    console.log(Brands); // Log the Brands to the console
    res.json({ Brands, message: 'Success' }); // Send a success response with the Brands and a message

});
 




/**
 * Function to transform data in the "brands" collection .
 * Retrieves all documents from the collection, iterates over each document,
 * transforms the data according to the schema, validates the document,
 * and saves the updated document.
 * 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const transformData = catchError(async (req, res) => {
    // Retrieve all documents from the collection
    const brands = await BrandModel.find(); // Retrieve all brand documents

    // Iterate over each document
    for (const brand of brands) { // Iterate over each brand document
        // Transform data according to requirements

        // Ensure brandName is a non-empty string
        if (typeof brand.brandName !== 'string' || brand.brandName.trim() === '') { // Check if brand name is a string and not empty
            brand.brandName = 'Unknown'; // Set to default value if not valid
        }

        // Ensure headquarters is a non-empty string
        if (typeof brand.headquarters !== 'string' || brand.headquarters.trim() === '') { // Check if headquarters is a string and not empty
            brand.headquarters = 'Unknown'; // Set to default value if not valid
        }

        // Ensure yearFounded is a valid number
        if (typeof brand.yearFounded !== 'number' || isNaN(brand.yearFounded)) { // Check if yearFounded is a number and not NaN
            // Try to get yearFounded from yearCreated, otherwise set to default value
            brand.yearFounded = typeof brand.yearFounded === 'number' ? brand.yearFounded : 
                                typeof brand.yearCreated === 'number' ? brand.yearCreated : 1600; // Set to yearCreated if valid, otherwise set to default value
        }

        // Ensure numberOfLocations is a valid number
        if (typeof brand.numberOfLocations !== 'number' || isNaN(brand.numberOfLocations)) { // Check if numberOfLocations is a number and not NaN
            brand.numberOfLocations = typeof brand.numberOfLocations === 'number' ? brand.numberOfLocations : 1; // Set to default value if not valid
        }

        // Validate the document against the schema
        await brand.validate(); // Validate the brand document against the schema

        // Save the updated document
        await brand.save(); // Save the updated brand document
    }

    // Check if any brands were found
    if (brands.length === 0) { // Check if no brands were found
        throw new AppError('No brands found', 404); // Throw an error if no brands were found
    }

    // Log completion message and send success response
    console.log('Data transformation complete.'); // Log completion message
    res.status(200).json({brands,message: 'Data transformation complete.' }); // Send success response

    // Close the database connection
    mongoose.disconnect() // Close the database connection
    
});






// Promisify the exec function to use async/await
const execAsync = promisify(exec);
/**
 * Function to create a backup of a MongoDB collection.
 * 
 * @param {string} database - The MongoDB database name.
 * @param {string} collection - The MongoDB collection name.
 * @param {string} backupDir - The directory path to store the backup files.
 * @returns {Promise<void>} - The function returns a Promise that resolves when the backup is complete.
 */
export async function createBackup(database: string, collection: string, backupDir: string): Promise<void> {
    try {
        // Execute mongodump command to create a backup
        const { stdout, stderr } = await execAsync(`mongodump --db ${database} --collection ${collection} --out ${backupDir}`);

        // Handle success or error
        if (stderr) {
            throw new AppError('Error creating backup: '+stderr, 500);
        } else {
            throw new AppError('Backup created successfully: '+stdout, 200);
        }
    } catch (error) {
        throw new AppError('Error creating backup: '+error, 500);
    }
}




/**
 * Function to seed the "brands" collection with 10 new documents.
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const SeedData = catchError(async (req, res) => {
    // Generate 10 fake brand documents
    const seededData = [];
    for (let i = 0; i < 10; i++) {
        const brandFakeData = {
            brandName: faker.company.name(), // Generate a random company name
            yearFounded: faker.number.int({ min: 1900, max: 2022 }), // Generate a random year between 1900 and 2022
            headquarters: faker.location.city(), // Generate a random city name
            numberOfLocations: faker.number.int({ min: 1, max: 1000 }), // Generate a random number of locations
        };
        seededData.push(brandFakeData);
    }

    // Insert new brand documents into the database
    const NewBrandData = await BrandModel.insertMany(seededData);

    console.log('Seed data inserted successfully');
    res.status(200).json({ NewBrandData, message: 'Seed data inserted successfully' });

}); // End of SeedData function
