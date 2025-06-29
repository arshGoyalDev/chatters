import { Redis } from "ioredis";

// Redis clients
const client = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

const pub = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

const sub = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

client.on("connect", () => console.log("Redis Client Connected"));
client.on("error", (err) => console.log("Redis Client Error", err));

pub.on("connect", () => console.log("Redis Publisher Connected"));
pub.on("error", (err) => console.log("Redis Publisher Error", err));

sub.on("connect", () => console.log("Redis Subscriber Connected"));
sub.on("error", (err) => console.log("Redis Subscriber Error", err));

// Caching functions
const cacheData = async (key, data, ttl = null) => {
  try {
    const serializedData = JSON.stringify(data);

    if (ttl) {
      await client.setex(key, ttl, serializedData);
    } else {
      await client.set(key, serializedData);
    }

    console.log(`Data cached successfully with key: ${key}`);
    return true;
  } catch (error) {
    console.error("Error caching data:", error);
    return false;
  }
};

const getCachedData = async (key) => {
  try {
    const cachedData = await client.get(key);

    if (cachedData === null) {
      return null;
    }

    const parsedData = JSON.parse(cachedData);
    return parsedData;
  } catch (error) {
    console.error("Error getting cached data:", error);
    return null;
  }
};

const keyExists = async (key) => {
  try {
    const exists = await client.exists(key);
    return exists === 1;
  } catch (error) {
    console.error("Error checking key existence:", error);
    return false;
  }
};

const removeCachedData = async (key) => {
  try {
    const result = await client.del(key);
    return result === 1;
  } catch (error) {
    console.error("Error removing cached data:", error);
    return false;
  }
};

// const closeConnection = async () => {
//   try {
//     await client.quit();
//     console.log("Redis connection closed");
//   } catch (error) {
//     console.error("Error closing Redis connection:", error);
//   }
// }

export { client, pub, sub, cacheData, getCachedData, keyExists, removeCachedData };
