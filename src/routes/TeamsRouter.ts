import { Router } from "express";
import TeamController from "../server/controllers/TeamController";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { teamSchema } from "../server/shared/services/YupSchemas";
import { isAuthenticated } from "../server/shared/middlewares/Auth";

export const teamsRouter = Router();

const teamBodyValidator = bodyValidator(teamSchema);

teamsRouter.use(isAuthenticated);

teamsRouter.get('/', TeamController.findAllTeam);

teamsRouter.get('/:id', TeamController.findTeamById);

teamsRouter.post('/', teamBodyValidator,TeamController.createTeam);

teamsRouter.delete('/:id', TeamController.deleteTeam);

teamsRouter.put('/:id', teamBodyValidator, TeamController.updateTeam);