import { Application } from "express";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Routes from "./routes/routes";
import { connectDatabase } from "./mongo/db";
import cookieParser from "cookie-parser";

dotenv.config();

export class App {
  public app: Application;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3333;

    this.middlewares();
    this.routes();
    this.database();
  }

  private middlewares(): void {
    this.app.use(cookieParser());
    this.app.use(cors({
      origin: "http://localhost:5173",
      credentials: true,
    }));
    this.app.use(express.json());
  }

  private routes(): void {
    const router = express.Router();
    this.app.use("/", Routes.define(router));
  }

  private async database(): Promise<void> {
    await connectDatabase();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor rodando na porta ${this.port}`);
    });
  }
}
