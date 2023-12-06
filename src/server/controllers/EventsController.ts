import { RequestHandler } from "express";
import EventModel from "../models/EventModel";
import { TEvent } from "../../../@types/types";
import User  from "../models/UserModel";
import { ObjectId } from "mongodb";

const createEvent: RequestHandler = async (req, res, next) => {
    const data: TEvent = req.body;
    try {
        let newEvent = null;
        if(data){
            newEvent = new EventModel({
                name: data.name,
                organizer: data.organizer,
                description: data.description,
                endDate: data.endDate,
                startDate: data.startDate,
                feedbacks: [],
                location: data.location,
                organizingCommitte: data.organizingCommitte,
                theme: data.theme,
                photo: {
                    data: req.file?.buffer,
                    contentType: req.file?.mimetype
                },
                participants: []
            })
            await newEvent.save()
            return res.status(201).json(newEvent);
        }
        next({message: 'Não foi possível adicionar o evento!', status: 400});;
    } catch (err) {
        return res.status(500).json({err});
    }
}

const findAllEvents: RequestHandler = async (req, res, next) => {
    try{
        const events = await EventModel.find();
        if(events)
            return res.status(200).json(events);
        return res.status(404).send('Sem eventos cadastrados');
    } catch (error) {
        return res.status(500).json({error})
    }
}

const findEventById: RequestHandler = async (req, res, next) => {
    try{
        const event = await EventModel.findById({_id: req.params.id});
        if(event)
            return res.status(200).json(event);
        next({message: 'Evento não encontrado', status: 404});
    } catch (error) {
        return res.status(500).json({error})
    }
}

const deleteEvent: RequestHandler = async (req, res, next) => {
    try{
      let id = req.params.id
      if(!ObjectId.isValid(id)){
        return next({message: 'ID invalido', status: 400});
      }
      const deleted = await EventModel.deleteOne({_id: id})
      if (deleted.deletedCount > 0){
        res.status(200).send('Evento deletado com sucesso')
      }else{
        next({message: 'Evento não encontrado', status: 404});
      }
    }catch(error){
      next({message: error, status: 500});
    }
  }


  const updateEvent: RequestHandler = async (req, res, next) => {
    try{
        const data: TEvent = req.body;
        const event = await EventModel.findById({_id: req.params.id});
        if(event) {
            await EventModel.updateOne({_id: req.params.id}, data);
            return res.status(200).send('Evento atualizado com sucesso!');
        }
        next({message: 'Evento não encontrado', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

const UserHistoryEvents: RequestHandler = async (req, res, next) => {    
    try {
        const userId = req.params.userId as string;
        const user = await User.findById({_id: userId}); 
        const events = await EventModel.find();
        if(!user)
            return next({message: 'Usuário não encontrado', status: 404});
        const participededEvents = events.filter(event => {
            if(event.participants.includes(user._id))
                return event;
        })
        return res.status(200).json(participededEvents);
    } catch (err){
        console.log(err);
    }
}

const EventsByLocation: RequestHandler = async (req, res, next) => {    
    try {
        const lat = parseFloat(req.params.lat as string);
        const lng = parseFloat(req.params.lng as string);
        console.log(lat, lng);
        if(!lat || !lng)
            return next({message: "Informe uma localização válida", status: 400})
        const events = await EventModel.find({
            location: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                }
        );
        if(events)
            return res.status(200).send(events);
        next({message: "Não foi possível encontrar eventos com a localização informada", status: 400})
    } catch (error){
        next({message: error, status: 500});
    }
}

export default { createEvent, findAllEvents, updateEvent, findEventById, deleteEvent, UserHistoryEvents, EventsByLocation }