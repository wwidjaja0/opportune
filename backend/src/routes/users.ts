import express from "express";
import * as userController from "src/controllers/userController";
import upload from "src/middlewares/upload";
import * as userValidator from "src/validators/userValidator";

const router = express.Router();

router.get("/", userController.getUsers);
router.post(
  "/",
  upload.single("profilePicture"),
  userValidator.createUserValidator,
  userController.createUser,
);

router.get("/:id", userController.getUserById);
router.patch(
  "/:id",
  upload.single("profilePicture"),
  userValidator.updateUserValidator,
  userController.updateUser,
);
router.delete("/:id", userController.deleteUser);

export default router;
