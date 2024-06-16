import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import dotenv from "dotenv";

const app = fastify();

app.listen({ port: 3333 }).then(() => {
  console.log("Servidor rodando na porta 3333");
});
