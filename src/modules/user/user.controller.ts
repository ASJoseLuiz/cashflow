import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { ForbiddenException } from "../../utils/http/ForbiddenException";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password, confirmPassword } = req.body;
      await this.userService.saveUser(name, email, password, confirmPassword);
      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  public async getAllUsers(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  public async getUserByEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.params;
      const user = await this.userService.getUserByEmail(email);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!req.user) {
        throw new ForbiddenException("Usuário não autenticado");
      }

      if (email !== req.user.email) {
        throw new ForbiddenException("Você só pode deletar sua própria conta");
      }

      await this.userService.deleteUser(email, password);
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, email, password } = req.body;
    if (!req.user) {
      throw new ForbiddenException("Usuário não autenticado");
    }
    try {
      if (email) {
        await this.userService.updateUserEmail(req.user.sub, email);
      }
      if (name) {
        await this.userService.updateUserName(req.user.sub, name);
      }
      if (password) {
        await this.userService.updateUserPassword(req.user.sub, password);
      }

      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
