import { Router } from "express";
import { AuthorsController } from "../controllers/AuthorsController";

const router = Router();
const controller = new AuthorsController();

router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));
router.post("/", (req, res) => controller.create(req, res));
router.patch("/:id", (req, res) => controller.update(req, res)); //! update gedir, amma update olunmuyan field-ler null olur
router.delete("/:id", (req, res) => controller.delete(req, res));

// Author's books
router.get("/:id/books", (req, res) => controller.getBooks(req, res));//! yalnis id gonderilde bos array gelir

export default router;
