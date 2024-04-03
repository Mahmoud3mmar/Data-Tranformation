// Import necessary modules
import request from 'supertest';
import express from 'express'; // Assuming your Express app is in app.js
import BrandModel from '../src/Models/brands-schema'; // Assuming the path to your BrandModel file
const app=express()
// Mocking the BrandModel.find() method
jest.mock('../models/BrandModel', () => ({
  find: jest.fn()
}));

describe('transformData function', () => {
  it('should transform data correctly and send success response', async () => {
    // Mock the BrandModel.find() method to return some dummy data
    BrandModel.find([
      { 
        brandName: 'Example Brand',
        headquarters: 'Example Headquarters',
        yearFounded: 2000,
        numberOfLocations: 5,
        validate: jest.fn(),
        save: jest.fn()
      }
    ]);

    const res = await request(app).post('/your-transform-data-endpoint'); // Replace with your actual endpoint

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Data transformation complete.' });
  });

  it('should handle no brands found and throw AppError', async () => {
    // Mock the BrandModel.find() method to return an empty array
    BrandModel.find([]);

    const res = await request(app).post('/your-transform-data-endpoint'); // Replace with your actual endpoint

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'No brands found' });
  });

  // Add more test cases as needed
});