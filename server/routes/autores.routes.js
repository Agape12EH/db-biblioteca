import { Router } from "express";
import AutoresControllers from "../controllers/AutoresControllers.js";

const router = new Router();

router.get("/", AutoresControllers.getAll);
router.get("/:id", AutoresControllers.getOne);
router.post("/", AutoresControllers.create);
router.put("/:id", AutoresControllers.update);
router.delete("/:id", AutoresControllers.destroy);

export default router;
