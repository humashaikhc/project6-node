import Router from "express";
import { getData,addData,getId,deleteData,updateChocolateById } from "../controller/chocolate.js";

const router = Router();

router.get("/", getData);

router.get("/:id", getId);

router.delete("/:id", deleteData);

router.post("/", addData);

router.put("/:id", updateChocolateById);

export default router;
