import { Router } from "express";
import { getMovies } from "../controllers/MovieController.js";
import authenticateJWT from "../middleware/auth.js";

const router = Router();

router.get("/movies", authenticateJWT, getMovies);
router.get("/movies/:id", authenticateJWT, getMovies);
router.post("/movies", authenticateJWT, getMovies);
router.put("/movies/:id", authenticateJWT, getMovies);
router.delete("/movies/:id", authenticateJWT, getMovies);

export default router;
