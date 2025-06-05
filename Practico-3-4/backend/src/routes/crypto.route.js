import { Router } from "express";
import { getCryptos, createCrypto } from "../controller/crypto.controller.js";

export const CryptoRoutes = () => {
  const router = Router();

  router.get("/", getCryptos);
  router.post("/", createCrypto);

  return router;
}