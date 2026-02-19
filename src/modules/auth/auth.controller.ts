import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { ForbiddenException } from "../../utils/http/ForbiddenException";

export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    try {
      const token = await this.authService.login(email, password);
      if (!token) {
        throw new ForbiddenException("Email ou senha inválidos");
      }
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });
  
      res.status(200).json({ message: "Login realizado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  public logout(req: Request, res: Response): void {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout realizado com sucesso" });
  }

  public me(req: Request, res: Response): void {
    res.status(200).json({ user: (req as any).user });
  }
}
