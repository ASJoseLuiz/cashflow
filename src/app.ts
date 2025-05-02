import { Application } from "express";
import express from "express";
import dotenv from "dotenv";
import Routes from "./routes/routes";
import { connectDatabase } from "./mongo/db";

dotenv.config();

export class App {
  public app: Application;
  private readonly port: Number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 0;

    this.middlewares();
    this.routes();
    this.database();
  }

  private middlewares(): void {
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
