import { createClient } from "redis";

const redisClient = createClient({url : process.env.REDIS_URL || "redis://127.0.0.1:63140" });

redisClient.on("error", (err) => console.log("Redis Error:", err));

const start = async () => {
  await redisClient.connect();
  console.log("Redis Container Connected ✅");
};

start();

export default redisClient;


// Meaning for this function => Ye function sirf redis server se connect krta hai , redis 
// server ko start nhi krta. 

// Agar apko redis server start krna hai toh apko terminal se start krna pdega ya fir docker se. 

// Agar ap chahte ho ki apko redis PC start krte hi automatic start ho jaye , toh apko : 
// docker update --restart=always <container_id>
// run krna pdega.

// Isko automatic start karne ka ek or tarika hai : Docker-Compose . Iske baare me apna
// detail me samajh lenge kabhi. 

