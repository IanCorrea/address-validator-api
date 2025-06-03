import rateLimit from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";

export async function registerRateLimiter(app: FastifyInstance): Promise<void> {
  await app.register(rateLimit, {
    max: 10,
    timeWindow: "5 seconds",
    addHeaders: {
      "x-ratelimit-limit": true,
      "x-ratelimit-remaining": true,
      "x-ratelimit-reset": true,
    },
  });
}
