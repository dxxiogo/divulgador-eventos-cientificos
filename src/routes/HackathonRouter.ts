import { Router } from "express";
import { createHackathon, deleteHackathon, findAllHackathon, findHackathonById, updateHackathon } from "../server/controllers/HackathonController";

export const hackathonRouter = Router();


hackathonRouter.get('/', findAllHackathon);

hackathonRouter.get('/:id', findHackathonById);

hackathonRouter.post('/', createHackathon);

hackathonRouter.delete('/:id', deleteHackathon);

hackathonRouter.put('/:id', updateHackathon);