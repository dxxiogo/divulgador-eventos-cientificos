import { Router } from "express";
import FeedbackController from "../server/controllers/FeedbackController";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { feedbackSchema } from "../server/shared/services/YupSchemas";
import { isAuthenticated } from "../server/shared/middlewares/Auth";

export const feedbackRouter = Router();

const feedbackBodyValidator = bodyValidator(feedbackSchema)

feedbackRouter.use(isAuthenticated);

feedbackRouter.get('/', FeedbackController.findAllFeedback);

feedbackRouter.get('/:id', FeedbackController.findFeedbackById);

feedbackRouter.post('/', feedbackBodyValidator , FeedbackController.createFeedback);

feedbackRouter.delete('/:id', FeedbackController.deleteFeedback);

feedbackRouter.put('/:id', feedbackBodyValidator,  FeedbackController.updateFeedback);