import { Router } from "express";
import { createHackathon, deleteHackathon, findAllHackathon, findHackathonById, updateHackathon } from "../server/controllers/HackathonController";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { hackathonSchema } from "../server/schema/YupSchemas";

export const hackathonRouter = Router();

const hackathonBodyValidator = bodyValidator(hackathonSchema);

hackathonRouter.get('/', findAllHackathon);

hackathonRouter.get('/:id', findHackathonById);

hackathonRouter.post('/', hackathonBodyValidator, createHackathon);

hackathonRouter.delete('/:id', deleteHackathon);

hackathonRouter.put('/:id', updateHackathon);