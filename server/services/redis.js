import { Redis } from "ioredis";
// const redis = require('redis');

// Create Redis clients
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

// Handle connection events
client.on("connect", () => console.log("Redis Client Connected"));
client.on("error", (err) => console.log("Redis Client Error", err));

pub.on("connect", () => console.log("Redis Publisher Connected"));
pub.on("error", (err) => console.log("Redis Publisher Error", err));

sub.on("connect", () => console.log("Redis Subscriber Connected"));
sub.on("error", (err) => console.log("Redis Subscriber Error", err));

// Export the clients
export { client, pub, sub };
