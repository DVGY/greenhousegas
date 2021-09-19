import redis from 'redis';
import { promisify } from 'util';

let redisHost = '127.0.0.1';

if (process.env.NODE_ENV === 'production') {
  if (!process.env.REDIS_HOST) {
    throw new Error('REDIS HOST is not defined');
  }
  redisHost = process.env.REDIS_HOST;
}

if (!process.env.REDIS_PORT) {
  throw new Error('REDIS PORT is not defined');
}

const redisClient = redis.createClient({
  host: redisHost,
  port: parseInt(process.env.REDIS_PORT),
});

const redisClientGet = promisify(redisClient.get).bind(redisClient);
const redisClientSet = promisify(redisClient.set).bind(redisClient);

export { redisClient, redisClientGet, redisClientSet };
