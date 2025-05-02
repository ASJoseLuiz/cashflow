import { NextFunction, Request, Response } from "express";
import { IncomeService } from "./income.service";

export class IncomeController {
  private readonly incomeService: IncomeService;

  constructor(incomeService: IncomeService) {
    this.incomeService = incomeService;
  }

  public async getAllIncomes(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const receitas = await this.incomeService.getAllIncomes();
      res.status(200).json(receitas);
    } catch (error) {
      next(error);
    }
  }

  public async getIncomeByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId } = req.params;
    try {
      const receita = await this.incomeService.getIncomeByUserId(userId);
      res.status(200).json(receita);
    } catch (error) {
      next(error);
    }
  }

  public async saveIncome(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.sub;
    const { value, category, description } = req.body;

    try {
      await this.incomeService.saveIncome(userId, value, category, description);
      res.status(200).json(`Receita criada com sucesso`);
    } catch (error) {
      next(error);
    }
  }

  public async deleteAllIncomes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.sub;

    try {
      await this.incomeService.deleteAllIncomes(userId);
      res.status(200).json("Receitas deletadas");
    } catch (error) {
      next(error);
    }
  }

  public async deleteIncome(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.sub;
    const { incomeId } = req.params;
    try {
      await this.incomeService.deleteIncomeById(userId, incomeId);
      res.status(200).json("Receita deletada");
    } catch (error) {
      next(error);
    }
  }

  public async updateIncome(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.sub;
    const { incomeId } = req.params;
    const { value, description, category } = req.body;

    try {
      if (value) {
        await this.incomeService.updateIncomeValue(userId, incomeId, value);
      }
      if (description) {
        await this.incomeService.updateIncomeDescription(
          userId,
          incomeId,
          description
        );
      }
      if (category) {
        await this.incomeService.updateIncomeCategory(
          userId,
          incomeId,
          category
        );
      }

      res.status(200).json({ message: "Receita atualizada com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
