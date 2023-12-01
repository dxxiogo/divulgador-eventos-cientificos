import { Router } from "express";
import { createEvent, deleteEvent, findAllEvents, findEventById, updateEvent} from "../server/controllers/EventsController";
import { upload } from "../server/shared/middlewares/Multer";

export const eventsRouter = Router();


eventsRouter.get('/', findAllEvents);

eventsRouter.get('/:id', findEventById);

eventsRouter.post('/', upload.single('photo'), createEvent);

eventsRouter.delete('/:id', deleteEvent);

eventsRouter.put('/:id', updateEvent);

