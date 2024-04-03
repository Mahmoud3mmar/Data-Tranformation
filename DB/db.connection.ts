import mongoose from 'mongoose'


/**
 * Connect to MongoDB using the DB_STRING environment variable.
 */
const ConnectToDB = () => {
  // Access the environment variable
  const dbString : string|undefined = process.env.DB_STRING;

  // Exit early if DB_STRING is not defined
  if (!dbString) {
    console.error('DB_STRING environment variable is not defined');
    return;
  }

  // Connect to the DB
  mongoose
    .connect(dbString)
    .then(() => {
      /**
       * Log a message to the console to confirm that the 
       * connection was successful.
       */
      console.log("Connected to db....");
    })
    .catch((error) => {
      /**
       * Log an error message to the console if the DB connection
       * fails.
       */
      console.error('DB connection failed!!!!!');
    });
};



export default  ConnectToDB