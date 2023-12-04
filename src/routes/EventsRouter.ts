import { Router } from "express";
import { EventsByLocation, UserHistoryEvents, createEvent, deleteEvent, findAllEvents, findEventById, updateEvent} from "../server/controllers/EventsController";
import { upload } from "../server/shared/middlewares/Multer";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { eventSchema } from "../server/schema/YupSchemas";

export const eventsRouter = Router();

const eventBodyValidator = bodyValidator(eventSchema);

eventsRouter.get('/', findAllEvents);

eventsRouter.get('/:id', findEventById);

eventsRouter.post('/',upload.single('photo'), eventBodyValidator, createEvent);

eventsRouter.delete('/:id', deleteEvent);

eventsRouter.put('/:id', updateEvent);

eventsRouter.get('/historico-de-eventos/:userId', UserHistoryEvents);

eventsRouter.get('/eventos-por-localizacao/:lat/:lng', EventsByLocation);