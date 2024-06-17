import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const server = Fastify();

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

server.register(app);

const start = async () => {
  try {
    await server.listen(process.env.PORT || 3000);
    server.log.info(`Servidor rodando`);
  } catch (error) {
    server.log.error(error);
  }
};

start();
