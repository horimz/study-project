import mongoose from 'mongoose';
import { keys } from '../keys';

const connectionString: string = keys.mongodbUrl;

// Connects to our mongo database When filed is imported
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    return console.log('Successfully connected to MongoDB');
  })
  .catch(error => {
    console.log('Failed to connect to MongoDB: ', error);
    return process.exit(1);
  });
