import { Router } from "express";
import { incomeController } from "./income.module";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validateBody.middleware";
import {
  createIncomeSchema,
  updateIncomeSchema,
} from "../../utils/zod/income/income.zod";

const incomeRouter: Router = Router();

incomeRouter.get("/", authMiddleware, (req, res, next) =>
  incomeController.getAllIncomes(req, res, next)
);
incomeRouter.get("/:userId", authMiddleware, (req, res, next) =>
  incomeController.getIncomeByUserId(req, res, next)
);
incomeRouter.post(
  "/",
  authMiddleware,
  validateBody(createIncomeSchema),
  (req, res, next) => incomeController.saveIncome(req, res, next)
);
incomeRouter.put(
  "/:incomeId",
  authMiddleware,
  validateBody(updateIncomeSchema),
  (req, res, next) => incomeController.updateIncome(req, res, next)
);

incomeRouter.delete("/", authMiddleware, (req, res, next) =>
  incomeController.deleteAllIncomes(req, res, next)
);

incomeRouter.delete("/:incomeId", authMiddleware, (req, res, next) =>
  incomeController.deleteIncome(req, res, next)
);

export default incomeRouter;
