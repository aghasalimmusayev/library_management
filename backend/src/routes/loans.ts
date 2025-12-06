import { Router } from "express";
import { LoansController } from "../controllers/LoansController";

const router = Router();
const controller = new LoansController();

router.get("/", (req, res) => controller.getAll(req, res));
router.get("/active", (req, res) => controller.getActive(req, res));
router.get("/overdue", (req, res) => controller.getOverdue(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));
router.post("/", (req, res) => controller.create(req, res));
router.put("/:id", (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

// Return a loan
router.patch("/:id/return", (req, res) => controller.returnLoan(req, res));

export default router;
