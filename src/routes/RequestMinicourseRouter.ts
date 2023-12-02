import { Router } from "express";
import { createRequestMinicourse, deleteRequestMinicourse, findAllRequestMinicourse, findRequestMinicourseById, updateRequestMinicourse } from "../server/controllers/RequestMinicourseController";

export const requestMinicoursesRouter = Router();


requestMinicoursesRouter.get('/', findAllRequestMinicourse);

requestMinicoursesRouter.get('/:id', findRequestMinicourseById);

requestMinicoursesRouter.post('/', createRequestMinicourse);

requestMinicoursesRouter.delete('/:id', deleteRequestMinicourse);

requestMinicoursesRouter.put('/:id', updateRequestMinicourse);