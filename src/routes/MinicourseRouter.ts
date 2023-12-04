import { Router } from "express";
import { createMinicourse, deleteMinicourse, findAllMinicourse, findMinicourseById, updateMinicourse } from "../server/controllers/MinicourseController";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { minicourseSchema } from "../server/schema/YupSchemas";

export const minicoursesRouter = Router();

const minicourseBodyValidator = bodyValidator(minicourseSchema);

minicoursesRouter.get('/', findAllMinicourse);

minicoursesRouter.get('/:id', findMinicourseById);

minicoursesRouter.post('/', minicourseBodyValidator, createMinicourse);

minicoursesRouter.delete('/:id', deleteMinicourse);

minicoursesRouter.put('/:id', updateMinicourse);