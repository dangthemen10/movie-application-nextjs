import mongoose from 'mongoose';

const connection_Url = process.env.MONGODB_URL || '';
const databaseName = process.env.DB_NAME || '';
const databaseUser = process.env.DB_USERNAME || '';
const databasePassword = process.env.DB_PASSWORD || '';

export default function connectMongo() {
  mongoose.set('strictQuery', false);
  const connection = mongoose.connection;

  connection.on('connected', () => {
    console.log('Mongo Connection Established');
  });
  connection.on('reconnected', () => {
    console.log('Mongo Connection Reestablished');
  });
  connection.on('disconnected', () => {
    console.log('Mongo Connection Disconnected');
    console.log('Trying to reconnect to Mongo ...');
    setTimeout(() => {
      mongoose.connect(connection_Url, {
        dbName: databaseName,
        user: databaseUser,
        pass: databasePassword
      });
    }, 3000);
  });
  connection.on('close', () => {
    console.log('Mongo Connection Closed');
  });
  connection.on('error', (error: Error) => {
    console.log('Mongo Connection ERROR: ' + error);
  });
  const run = async () => {
    await mongoose.connect(connection_Url, {
      dbName: databaseName,
      user: databaseUser,
      pass: databasePassword
    });
  };
  run().catch((error) => console.error(error));
}
