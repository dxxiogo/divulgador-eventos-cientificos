import { Router } from "express";
import { createFeedback, deleteFeedback, findAllFeedback, findFeedbackById, updateFeedback } from "../server/controllers/FeedbackController";

export const feedbackRouter = Router();


feedbackRouter.get('/', findAllFeedback);

feedbackRouter.get('/:id', findFeedbackById);

feedbackRouter.post('/',  createFeedback);

feedbackRouter.delete('/:id', deleteFeedback);

feedbackRouter.put('/:id', updateFeedback);