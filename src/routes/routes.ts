import express from "express";
import { UserController } from "../controllers/userController";
import { CarController } from "../controllers/carController";
import { auth, authAdmin, authSuperAdmin } from "../middlewares/auth";
import upload from "../utils/fileUploadConfig";

const router = express.Router();
const userController = new UserController();
const carController = new CarController();

// User Routes
router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));
router.post("/logout", auth, userController.logout.bind(userController));
router.post(
  "/login/google",
  userController.loginWithGoogle.bind(userController)
);

router.get("/profile", auth, userController.profile.bind(userController));

router.get("/users", authAdmin, userController.list.bind(userController));
router.get("/users/:id", authAdmin, userController.detail.bind(userController));
router.post(
  "/users",
  authSuperAdmin,
  userController.store.bind(userController)
);
router.put("/users/:id", auth, userController.update.bind(userController));
router.put(
  "/users/:id/change-password",
  auth,
  userController.changePassword.bind(userController)
);
router.delete(
  "/users/:id",
  authSuperAdmin,
  userController.destroy.bind(userController)
);

// Car Routes
router.get("/cars", carController.list.bind(carController));
router.get("/cars/:id", carController.detail.bind(carController));
router.post(
  "/cars",
  authAdmin,
  upload.single("image"),
  carController.create.bind(carController)
);
router.put(
  "/cars/:id",
  authAdmin,
  upload.single("image"),
  carController.update.bind(carController)
);
router.delete(
  "/cars/:id",
  authAdmin,
  carController.destroy.bind(carController)
);

export default router;
