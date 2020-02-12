import mongoose from 'mongoose';
import { keys } from '../keys';

const connectionString: string = keys.mongodbUrl;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false, // remove the deprication warning,
    useUnifiedTopology: true
  })
  .then(() => {
    return console.log('Successfully connected to MongoDB');
  })
  .catch(error => {
    console.log('Failed to connect to MongoDB: ', error);
    return process.exit(1);
  });
