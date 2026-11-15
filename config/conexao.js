import mongoose from "mongoose";
import dns from "node:dns";
import "dotenv/config";

// Usado para configurar os servidores DNS para a conexão com o MongoDB
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const url = process.env.MONGODB_URI;

const conexao = await mongoose.connect(url);

export default conexao;
