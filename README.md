# Data-Tranformation API Documentation
# Brand Transformation API Documentation

## Overview
This API provides endpoints to interact with a MongoDB collection named "brands". It allows users to retrieve brands, transform existing brand data, and seed the database with new brand documents.

## Endpoints

1. **Retrieve Brands**

   - **Endpoint**: `GET /api/brands`
   - **Description**: Retrieves all brands from the MongoDB collection.
   - **Response**:
     - *200 OK*: Returns an array of brands along with a success message.
     - *404 Not Found*: If no brands are found in the collection.

2. **Transform Data**

   - **Endpoint**: `PUT /api/brands/transform`
   - **Description**: Transforms existing brand data in the MongoDB collection based on specified requirements. It validates the data against a predefined schema and updates the documents accordingly.
   - **Response**:
     - *200 OK*: Returns a success message along with the transformed brands.
     - *404 Not Found*: If no brands are found in the collection.

3. **Seed Data**

   - **Endpoint**: `POST /api/brands/seed`
   - **Description**: Seeds the MongoDB collection with new brand documents. It generates fake data for brands and inserts them into the database.
   - **Response**:
     - *200 OK*: Returns the newly seeded brand data along with a success message.

## Project Structure

├── src
│   ├── Controllers
│   │   └── brands-controller.ts
│   ├── Models
│   │   └── brands-schema.ts
│   ├── Routes
│   │   └── brands-routes.ts
│   └── Utils
│       ├── GlobalErrorHandler.ts
│       └── ...
├── .env
├── package.json
└── README.md


- **Controllers**: Contains the controller functions for handling HTTP requests.
- **Models**: Defines the Mongoose schema for the "brands" collection.
- **Routes**: Defines the API routes for the brand endpoints.
- **Utils**: Contains utility functions, such as error handling.

## Dependencies

- `mongoose`: MongoDB object modeling tool for Node.js.
- `express`: Web framework for Node.js.
- `dotenv`: Loads environment variables from a `.env` file.
- `@faker-js/faker`: Library for generating fake data for testing and seeding.

This documentation provides an overview of the Brand Transformation API, its endpoints, how to run the project, project structure, and dependencies. It serves as a guide for developers and users to understand and interact with the API.
