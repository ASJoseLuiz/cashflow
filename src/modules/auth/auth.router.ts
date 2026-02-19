import { Router } from "express";
import { authController } from "./auth.module";
import { validateBody } from "../../middlewares/validateBody.middleware";
import { authUserSchema } from "../../utils/zod/user/user.zod";
import { authMiddleware } from "../../middlewares/auth.middleware";

const authRouter: Router = Router();

authRouter.post("/login", validateBody(authUserSchema), (req, res, next) =>
  authController.login(req, res, next)
);

authRouter.get("/me", authMiddleware, (req, res) => authController.me(req, res));

authRouter.post("/logout", (req, res) => authController.logout(req, res));

export default authRouter;
