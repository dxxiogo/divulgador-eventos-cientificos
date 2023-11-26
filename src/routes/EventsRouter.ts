import { Router } from "express";
import { createEvent, deleteEvent, findAllEvents, findEventById, updateEvent} from "../server/controllers/EventsController";
import { upload } from "../server/shared/middlewares/Multer";

export const eventsRouter = Router();


eventsRouter.get('/evento', findAllEvents);

eventsRouter.get('/evento/:id', findEventById);

eventsRouter.post('/evento', upload.single('photo'), createEvent);

eventsRouter.delete('/evento/:id', deleteEvent);

eventsRouter.put('/evento/:id', updateEvent);

