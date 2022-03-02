require('dotenv').config()
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { app } from './app'

const start = async () => {
  
  try {
    const mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();
  
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
      
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();