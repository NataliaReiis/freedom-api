import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

const server: FastifyInstance = fastify({ logger: true });

server.listen(
  {
    port: 3100,
  },
  () => console.log("Server is running on port 3100")
);
