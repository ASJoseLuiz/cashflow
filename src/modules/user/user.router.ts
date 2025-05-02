import { Router } from "express";
import { userController } from "./user.module";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validateBody.middleware";
import {
  authUserSchema,
  createUserSchema,
  updateUserSchema,
} from "../../utils/zod/user/user.zod";

const userRouter: Router = Router();

userRouter.get("/", (req, res, next) =>
  userController.getAllUsers(req, res, next)
);
userRouter.get("/:email", (req, res, next) =>
  userController.getUserByEmail(req, res, next)
);
userRouter.post("/", validateBody(createUserSchema), (req, res, next) =>
  userController.createUser(req, res, next)
);
userRouter.delete(
  "/",
  authMiddleware,
  validateBody(authUserSchema),
  (req, res, next) => userController.deleteUser(req, res, next)
);

userRouter.put(
  "/",
  authMiddleware,
  validateBody(updateUserSchema),
  (req, res, next) => userController.updateUser(req, res, next)
);

export default userRouter;
