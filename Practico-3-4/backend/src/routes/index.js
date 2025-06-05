import { authenticateToken } from "../middlewares/auth.middleware.js";
import { AdRoutes } from "./ad.route.js";
import { AuthTokenRoutes } from "./authToken.route.js";
import { CryptoRoutes } from "./crypto.route.js";
import { UserRoutes } from "./user.route.js";
import { Router } from "express";

export const routes = (app) => {
  const router = Router();

  router.use("/auth", AuthTokenRoutes());
  router.use("/users", authenticateToken, UserRoutes());
  router.use("/ads", authenticateToken, AdRoutes());
  router.use("/cryptos", authenticateToken, CryptoRoutes());

  app.use("/api", router);
}