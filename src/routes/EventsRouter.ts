import { Router } from "express";
import { createEvent, deleteEvent, findAllEvents, findEventById, updateEvent, getCertificates, addParticipant, removeParticipant} from "../server/controllers/EventsController";
import { upload } from "../server/shared/middlewares/Multer";
import { get } from "mongoose";

export const eventsRouter = Router();


eventsRouter.get('/', findAllEvents);

eventsRouter.get('/:id', findEventById);

eventsRouter.post('/', upload.single('photo'), createEvent);

eventsRouter.delete('/:id', deleteEvent);

eventsRouter.put('/:id', updateEvent);

eventsRouter.get('/:id/certificates/:userid', getCertificates);

eventsRouter.post('/:id/addParticipant/:email', addParticipant);

eventsRouter.post('/:id/removeParticipant/:email', removeParticipant);