import { Router } from "express";
import { createFeedback, deleteFeedback, findAllFeedback, findFeedbackById, updateFeedback } from "../server/controllers/FeedbackController";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { feedbackSchema } from "../server/schema/YupSchemas";

export const feedbackRouter = Router();

const feedbackBodyValidator = bodyValidator(feedbackSchema)

feedbackRouter.get('/', findAllFeedback);

feedbackRouter.get('/:id', findFeedbackById);

feedbackRouter.post('/', feedbackBodyValidator ,createFeedback);

feedbackRouter.delete('/:id', deleteFeedback);

feedbackRouter.put('/:id', updateFeedback);