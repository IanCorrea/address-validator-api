import { fastify } from "fastify";
import { registerRateLimiter } from "./plugins/rateLimiter";
import { registerAddressRoutes } from "./routes/validateAddress";

const app = fastify();

async function bootstrap() {
  await registerRateLimiter(app);
  registerAddressRoutes(app);

  app.listen({ port: 3000 }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log(`🚀 Server running at ${address}`);
  });
}

bootstrap();
