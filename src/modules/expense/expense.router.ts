import { Router } from "express";
import { expenseController } from "./expense.module";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validateBody.middleware";
import {
  createExpenseSchema,
  updateExpenseSchema,
} from "../../utils/zod/expense/expense.zod";

const expenseRouter: Router = Router();

expenseRouter.get("/", authMiddleware, (req, res, next) =>
  expenseController.getAllExpenses(req, res, next)
);

expenseRouter.get("/:userId", authMiddleware, (req, res, next) =>
  expenseController.getExpensesByUserId(req, res, next)
);

expenseRouter.post(
  "/",
  authMiddleware,
  validateBody(createExpenseSchema),
  (req, res, next) => expenseController.saveExpense(req, res, next)
);

// Deletar uma despesa específica
expenseRouter.delete("/:expenseId", authMiddleware, (req, res, next) =>
  expenseController.deleteExpenseById(req, res, next)
);

// Deletar todas as despesas do usuário
expenseRouter.delete("/", authMiddleware, (req, res, next) =>
  expenseController.deleteAllExpenses(req, res, next)
);

expenseRouter.put(
  "/",
  authMiddleware,
  validateBody(updateExpenseSchema),
  (req, res, next) => expenseController.updateExpense(req, res, next)
);

export default expenseRouter;
