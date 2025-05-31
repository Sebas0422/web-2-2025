import { AuthTokenRoutes } from "./authToken.route.js";
import { UserRoutes } from "./user.route.js";
import { Router } from "express";

export const routes = (app) => {
  const router = Router();

  router.use("/auth", AuthTokenRoutes(router));
  router.use("/users", UserRoutes(router));

  app.use("/api", router);
}