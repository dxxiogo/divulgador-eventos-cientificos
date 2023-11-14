import { Router } from "express";
import { createEvent, deleteEvent, findAllEvents, findEventById, updateEvent} from "../server/controllers/EventsController";
import { upload } from "../server/shared/middlewares/Multer";

export const eventsRouter = Router();


eventsRouter.get('/events', findAllEvents);

eventsRouter.get('/event/:id', findEventById);

eventsRouter.post('/event', upload.single('photo'), createEvent);

eventsRouter.delete('/event/:id', deleteEvent);

eventsRouter.put('/event/:id', updateEvent);

