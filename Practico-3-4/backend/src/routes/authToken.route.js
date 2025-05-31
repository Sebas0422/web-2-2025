import { login, register } from "../controller/auth.controller.js";

export const AuthTokenRoutes = (router) =>{
  router.post("/login", login);
  router.post("/register", register);

  return router;
}
