import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

import { redisClient } from './utils/redis';

import { app } from './app';

const port = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

let DB = '';
if (!process.env.MONGO_CONNECTION_STRING) {
  throw new Error('process.env.MONGO_CONNECTION_STRING not defined');
}
if (!process.env.MONGO_PASSWORD) {
  throw new Error('process.env.MONGO_PASSWORD not defined');
}
if (!process.env.MONGO_DEV_DB) {
  throw new Error('process.env.MONGO_DEV_DB not defined');
}
if (!process.env.MONGO_PROD_DB) {
  throw new Error('process.env.MONGO_PROD_DB not defined');
}
if (!process.env.NODE_ENV) {
  throw new Error('process.env.NODE_ENV not defined');
}

if (process.env.NODE_ENV === 'development') {
  DB = process.env.MONGO_CONNECTION_STRING.replace(
    '<DATABASE>',
    process.env.MONGO_DEV_DB
  );
}

if (process.env.NODE_ENV === 'production') {
  DB = process.env.MONGO_CONNECTION_STRING.replace(
    '<DATABASE>',
    process.env.MONGO_PROD_DB
  );
}

DB = DB.replace('<PASSWORD>', process.env.MONGO_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', ' -> DB connection successfull!');
  })
  .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', ' -> DB connection FAIL');
    console.log(err);
  });

const server = app.listen(port, () => {
  console.log(`\x1b[32m -> Server started on port ${port}\x1b[0m`);
});

// redisClient.on('connect', function () {
//   console.info('Redis Client Connected on http://127.0.0.1:6379');
// });

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Heroku specific sigterm signal
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, Shutting down gracefully');
  server.close(() => {
    console.log('Process Terminated');
  });
});
