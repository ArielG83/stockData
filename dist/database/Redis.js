"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
class RedisClient {
    constructor() {
        // Create the Redis client and configure it as needed
        this.client = (0, redis_1.createClient)({ url: "redis://host.docker.internal:6379" });
        // Handle any client events or setup here
        this.client.on("error", (err) => {
            console.error("Redis Error:", err);
        });
        this.client.connect();
    }
    static getInstance() {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }
    getClient() {
        return this.client;
    }
}
exports.default = RedisClient.getInstance();
