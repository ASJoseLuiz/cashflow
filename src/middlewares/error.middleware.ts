import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/http/HttpException";

export function errorMiddleware(
  error: Error | HttpException,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = error instanceof HttpException ? error.status : 500;
  const message = error.message || "Erro interno do servidor";

  res.status(status).json({ status, message });
}
