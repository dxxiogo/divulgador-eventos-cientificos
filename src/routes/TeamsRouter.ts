import { Router } from "express";
import { createMinicourse, deleteMinicourse, findAllMinicourse, findMinicourseById, updateMinicourse } from "../server/controllers/MinicourseController";

export const teamsRouter = Router();


teamsRouter.get('/', findAllMinicourse);

teamsRouter.get('/:id', findMinicourseById);

teamsRouter.post('/', createMinicourse);

teamsRouter.delete('/:id', deleteMinicourse);

teamsRouter.put('/:id', updateMinicourse);