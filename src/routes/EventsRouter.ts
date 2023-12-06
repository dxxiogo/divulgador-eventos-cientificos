import { Router } from "express";
import EventController from "../server/controllers/EventsController";
import { upload } from "../server/shared/middlewares/Multer";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { eventSchema } from "../server/shared/services/YupSchemas";
import { isAuthenticated } from "../server/shared/middlewares/Auth";

export const eventsRouter = Router();

const eventBodyValidator = bodyValidator(eventSchema);

eventsRouter.use(isAuthenticated);

eventsRouter.get('/', EventController.findAllEvents);

eventsRouter.get('/:id', EventController.findEventById);

eventsRouter.post('/',upload.single('photo'), eventBodyValidator, EventController.createEvent);

eventsRouter.delete('/:id', EventController.deleteEvent);

eventsRouter.put('/:id', EventController.updateEvent);

eventsRouter.get('/historico-de-eventos/:userId', EventController.UserHistoryEvents);

eventsRouter.get('/eventos-por-localizacao/:lat/:lng', EventController.EventsByLocation);