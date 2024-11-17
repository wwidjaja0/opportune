import express from "express";
import * as userController from "src/controllers/userController";
import * as userValidator from "src/validators/userValidator";

const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.post(
  "/",
  userValidator.createUserValidator,
  userController.createUser,
);

userRouter.get("/:id", userController.getUserById);
userRouter.patch(
  "/:id",
  userValidator.updateUserValidator,
  userController.updateUser,
);
userRouter.delete("/:id", userController.deleteUser);

userRouter.get("/alumni", userController.getOpenAlumni);

export default userRouter;
