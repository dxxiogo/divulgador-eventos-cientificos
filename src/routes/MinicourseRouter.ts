import { Router } from "express";

export const minicoursesRouter = Router();


minicoursesRouter.get('/minicourses', findAllMinicourses);

minicoursesRouter.get('/minicourse/:id', findMinicourseById);

minicoursesRouter.post('/minicourse', createMinicourse);

minicoursesRouter.delete('/minicourse/:id', deleteminicourse);

minicoursesRouter.put('/minicourse/:id', updateMinicourse);