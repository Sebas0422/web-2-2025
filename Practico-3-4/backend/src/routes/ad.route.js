import { Router } from "express";
import { createAd, getAds } from "../controller/ad.controller.js";

export const AdRoutes = () => {
  const router = Router();
  router.get("/", getAds);
  router.post("/", createAd);

  return router;
}