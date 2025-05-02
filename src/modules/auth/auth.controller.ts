import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { ForbiddenException } from "../../utils/http/ForbiddenException";

export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password } = req.body;
    try {
      const token = await this.authService.login(email, password);
      if (!token) {
        throw new ForbiddenException("Email ou senha inválidos");
      }
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
