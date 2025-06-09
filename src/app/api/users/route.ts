import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  loginSchema,
  registerSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from "../validation/users.js";
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  requestPasswordResetController,
  resetPasswordController,
  currentUserController,
} from "../controllers/users.js";

export const userRouters = express.Router();
const jsonParser = express.json();

userRouters.post(
  "/signup",
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController)
);
userRouters.post(
  "/signin",
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController)
);
userRouters.get("/current", ctrlWrapper(currentUserController));
userRouters.post("/signout", ctrlWrapper(logoutController));
userRouters.post("/refresh", ctrlWrapper(refreshController));
userRouters.post(
  "/request-password-reset",
  jsonParser,
  validateBody(requestPasswordResetSchema),
  ctrlWrapper(requestPasswordResetController)
);
userRouters.post(
  "/reset-password",
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);

// userRouters.post(
//   "/",
//   // auth,
//   upload.single("images"),
//   jsonParser,
//   validateBody(usersSchema),
//   ctrlWrapper(createProjectController)
// );
