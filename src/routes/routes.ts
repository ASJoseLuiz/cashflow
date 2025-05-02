import { Router } from "express";
import userRouter from "../modules/user/user.router";
import authRouter from "../modules/auth/auth.router";
import incomeRouter from "../modules/income/income.router";
import expenseRouter from "../modules/expense/expense.router";
import reportRouter from "../modules/report/report.router";

export class Routes {
  static define(router: Router): Router {
    router.use("/user", userRouter);
    router.use("/login", authRouter);
    router.use("/income", incomeRouter);
    router.use("/expense", expenseRouter);
    router.use("/report", reportRouter);
    return router;
  }
}

export default Routes;
