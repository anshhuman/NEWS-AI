import { createClient } from "redis";

const redisClient = createClient({url : process.env.REDIS_URL || "redis://127.0.0.1:62394" });

redisClient.on("error", (err) => console.log("Redis Error:", err));

const start = async () => {
  await redisClient.connect();
  console.log("Connected to Redis!");
};

start();

export default redisClient;


// "redis://127.0.0.1:55953" 