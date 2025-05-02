import { Router } from "express";
import { authController } from "./auth.module";
import { validateBody } from "../../middlewares/validateBody.middleware";
import { authUserSchema } from "../../utils/zod/user/user.zod";

const authRouter: Router = Router();

authRouter.post("/", validateBody(authUserSchema), (req, res, next) =>
  authController.login(req, res, next)
);

export default authRouter;
