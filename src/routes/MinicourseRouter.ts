import { Router } from "express";
import { createMinicourse, deleteMinicourse, findAllMinicourse, findMinicourseById, updateMinicourse } from "../server/controllers/MinicourseController";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";


export const minicoursesRouter = Router();


minicoursesRouter.get('/', findAllMinicourse);

minicoursesRouter.get('/:id', findMinicourseById);

minicoursesRouter.post('/', createMinicourse);

minicoursesRouter.delete('/:id', deleteMinicourse);

minicoursesRouter.put('/:id', updateMinicourse);