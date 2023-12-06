import { Router } from "express";
import MinicourseController from "../server/controllers/MinicourseController";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { isAuthenticated } from "../server/shared/middlewares/Auth";

export const minicoursesRouter = Router();

minicoursesRouter.use(isAuthenticated);

minicoursesRouter.get('/', MinicourseController.findAllMinicourse);

minicoursesRouter.get('/:id', MinicourseController.findMinicourseById);

minicoursesRouter.post('/', MinicourseController.createMinicourse);

minicoursesRouter.delete('/:id', MinicourseController.deleteMinicourse);

minicoursesRouter.put('/:id', MinicourseController.updateMinicourse);