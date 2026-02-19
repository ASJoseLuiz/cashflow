import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: {
        sub: string;
        email: string;
      };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
    req.user = decoded as { sub: string; email: string };
    next();
  } catch (error) {
    next(error);
  }
}
