import { Router } from "express";
import HackathonController from "../server/controllers/HackathonController";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { hackathonSchema } from "../server/shared/services/YupSchemas";
import { isAuthenticated } from "../server/shared/middlewares/Auth";

export const hackathonRouter = Router();

const hackathonBodyValidator = bodyValidator(hackathonSchema);

hackathonRouter.use(isAuthenticated);

hackathonRouter.get('/', HackathonController.findAllHackathon);

hackathonRouter.get('/:id', HackathonController.findHackathonById);

hackathonRouter.post('/', hackathonBodyValidator, HackathonController.createHackathon);

hackathonRouter.delete('/:id', HackathonController.deleteHackathon);

hackathonRouter.put('/:id', HackathonController.updateHackathon);