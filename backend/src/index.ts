import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import ws from "@fastify/websocket";
import { createContext } from "./context";
import { appRouter } from "./router";
const server = fastify({
  maxParamLength: 5000,
  logger: true,
});

server.register(fastifyCors, {});
server.register(ws);
server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
  useWSS: true,
});

(async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
