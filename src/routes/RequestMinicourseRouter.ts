import { Router } from "express";
import { createRequestMinicourse, deleteRequestMinicourse, findAllRequestMinicourse, findRequestMinicourseById, updateRequestMinicourse } from "../server/controllers/RequestMinicourseController";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { requestMinicourseSchema } from "../server/schema/YupSchemas";

export const requestMinicoursesRouter = Router();

const requestMinicourseBodyValidator = bodyValidator(requestMinicourseSchema);

requestMinicoursesRouter.get('/', findAllRequestMinicourse);

requestMinicoursesRouter.get('/:id', findRequestMinicourseById);

requestMinicoursesRouter.post('/', requestMinicourseBodyValidator, createRequestMinicourse);

requestMinicoursesRouter.delete('/:id', deleteRequestMinicourse);

requestMinicoursesRouter.put('/:id', updateRequestMinicourse);