import { Router } from "express";
import { reportController } from "./report.module";
import { authMiddleware } from "../../middlewares/auth.middleware";

const reportRouter: Router = Router();

reportRouter.get("/", authMiddleware, (req, res, next) =>
  reportController.generateReport(req, res, next)
);

export default reportRouter;
