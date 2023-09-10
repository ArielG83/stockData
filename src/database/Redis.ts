import { RedisClientType, createClient } from "redis";

class RedisClient {
  private static instance: RedisClient;
  private client: RedisClientType;

  constructor() {
    // Create the Redis client and configure it as needed
    this.client = createClient({ url: "redis://host.docker.internal:6379" });

    // Handle any client events or setup here
    this.client.on("error", (err) => {
      console.error("Redis Error:", err);
    });

    this.client.connect();
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  public getClient(): RedisClientType {
    return this.client;
  }
}

export default RedisClient.getInstance();
