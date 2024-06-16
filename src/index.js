import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify();

app.listen({
  host: "0.0.0.0",
  port: 3333,
});

app.listen().then(() => {
  console.log("Servidor rodando na porta 3333");
});
