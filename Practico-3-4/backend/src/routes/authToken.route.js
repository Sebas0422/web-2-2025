import { Router } from "express";
import { login, register, logout } from "../controller/auth.controller.js";

export const AuthTokenRoutes = () =>{
  const router = Router();
  router.post("/login", login);
  router.post("/register", register);
  router.post("/logout", logout);
  
  return router;
}
