import { NextFunction, Request, Response } from "express";
import { ExpenseService } from "./expense.service";
import { ForbiddenException } from "../../utils/http/ForbiddenException";

export class ExpenseController {
  private readonly expenseService: ExpenseService;

  constructor(expenseService: ExpenseService) {
    this.expenseService = expenseService;
  }

  public async getAllExpenses(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const despesas = await this.expenseService.getAllExpenses();
      res.status(200).json(despesas);
    } catch (error) {
      next(error);
    }
  }

  public async getExpensesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.sub;
    const { otherId } = req.params;
    if (userId != otherId) {
      throw new ForbiddenException(
        "Não se pode acessar as despesas de outro usuário"
      );
    }
    try {
      const despesas = await this.expenseService.getExpensesByUserId(userId);
      res.status(200).json(despesas);
    } catch (error) {
      next(error);
    }
  }

  public async saveExpense(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.sub;
    const { value, category, description } = req.body;

    try {
      await this.expenseService.saveExpense(
        userId,
        value,
        category,
        description
      );
      res.status(200).json("Despesa criada com sucesso");
    } catch (error) {
      next(error);
    }
  }

  public async updateExpense(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.sub;
    const { expenseId, value, description, category } = req.body;

    try {
      if (value) {
        await this.expenseService.updateExpenseValue(userId, expenseId, value);
      }
      if (description) {
        await this.expenseService.updateExpenseDescription(
          userId,
          expenseId,
          description
        );
      }
      if (category) {
        await this.expenseService.updateExpenseCategory(
          userId,
          expenseId,
          category
        );
      }

      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  public async deleteExpenseById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.sub;
    const { expenseId } = req.params;
    try {
      await this.expenseService.deleteExpenseById(userId, expenseId);
      res.status(200).json("Despesa deletada");
    } catch (error) {
      next(error);
    }
  }

  public async deleteAllExpenses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.sub;

    try {
      await this.expenseService.deleteAllExpenses(userId);
      res.status(200).json("Todas as despesas foram removidas com sucesso.");
    } catch (error) {
      next(error);
    }
  }
}
