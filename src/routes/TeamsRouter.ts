import { Router } from "express";
import { createTeam, deleteTeam, findAllTeam, findTeamById, updateTeam } from "../server/controllers/TeamController";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { teamSchema } from "../server/schema/YupSchemas";

export const teamsRouter = Router();

const teamBodyValidator = bodyValidator(teamSchema);

teamsRouter.get('/', findAllTeam);

teamsRouter.get('/:id', findTeamById);

teamsRouter.post('/', teamBodyValidator, createTeam);

teamsRouter.delete('/:id', deleteTeam);

teamsRouter.put('/:id', updateTeam);