import { Router } from "express";
import RequestMinicourseController from "../server/controllers/RequestMinicourseController";
import { requestMinicourseSchema } from "../server/shared/services/YupSchemas";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";

export const requestMinicoursesRouter = Router();

const requestMinicourseBodyValidator = bodyValidator(requestMinicourseSchema);

requestMinicoursesRouter.get('/', RequestMinicourseController.findAllRequestMinicourse);

requestMinicoursesRouter.get('/:id', RequestMinicourseController.findRequestMinicourseById);

requestMinicoursesRouter.post('/', requestMinicourseBodyValidator, RequestMinicourseController.createRequestMinicourse);

requestMinicoursesRouter.delete('/:id', RequestMinicourseController.deleteRequestMinicourse);

requestMinicoursesRouter.put('/:id',requestMinicourseBodyValidator,  RequestMinicourseController.updateRequestMinicourse);