import { Router } from "express";
import { BooksController } from "../controllers/BooksController";

const router = Router();
const controller = new BooksController();

router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));
router.post("/", (req, res) => controller.create(req, res));
router.patch("/:id", (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

// Book-Author relationships
router.get("/:id/authors", (req, res) => controller.getAuthors(req, res));
router.post("/:id/authors", (req, res) => controller.addAuthor(req, res));
router.delete("/:id/authors/:authorId", (req, res) => controller.removeAuthor(req, res));

export default router;
