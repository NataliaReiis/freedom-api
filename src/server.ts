import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { userRoutes } from "./routes/user.routes";

dotenv.config();

const server: FastifyInstance = fastify({ logger: true });

server.register(userRoutes, {
  prefix: "/users",
});
server.listen(
  {
    port: 3000,
  },
  () => console.log("Server is running on port 3000")
);
