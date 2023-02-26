import Router from "express";
import {
  updateChocolateById,
  getChocolate,
  getChocolateById,
  deleteChocolate,
  addChocolate,
} from "../controller/chocolate.js";

const router = Router();

router.get("/", getChocolate);

router.get("/:id", getChocolateById);

router.delete("/:id", deleteChocolate);

router.post("/", addChocolate);

router.put("/:id", updateChocolateById);

export default router;
