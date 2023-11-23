import { RequestHandler } from "express";
import EventModel from "../models/EventModel";
import { TEvent } from "../../../@types/types";


export const createEvent: RequestHandler = async (req, res) => {
    const data: TEvent = req.body;
    try {
        let newEvent = null;
        if(data){
            newEvent = new EventModel({
                name: data.name,
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
                }

            })
            await newEvent.save()
            return res.status(201).json(newEvent);
        }
        return res.status(400).send('Não foi possível adicionar o novo evento. Informe todos os dados necessários');
    } catch (err) {
        return res.status(500).json({err});
    }
}

export const findAllEvents: RequestHandler = async (req, res) => {
    try{
        const events = await EventModel.find();
        if(events)
            return res.status(200).json(events);
        return res.status(404).send('Sem eventos cadastrados');
    } catch (error) {
        return res.status(500).json({error})
    }
}

export const findEventById: RequestHandler = async (req, res) => {
    try{
        const event = await EventModel.findById({_id: req.params.id});
        if(event)
            return res.status(200).json(event);

        return res.status(404).send('Evento não encontrado!');
    } catch (error) {
        return res.status(500).json({error})
    }
}


export const deleteEvent: RequestHandler = async (req, res) => {
    try{
        const event = await EventModel.findById({_id: req.params.id});
        if(event)
            return res.status(200).json(event);
        return res.status(404).send('Evento não encontrado!');
    } catch (error) {
        return res.status(500).json({error})
    }
}

export const updateEvent: RequestHandler = async (req, res) => {
    try{
        const data: TEvent = req.body;
        const event = await EventModel.findById({_id: req.params.id});
        if(event) {
            await EventModel.updateOne({_id: req.params.id}, data);
            return res.status(200).send('Evento atualizado com sucesso!');
        }
        return res.status(404).send('Evento não encontrado!');
    } catch (error) {
        return res.status(500).json({error})
    }
}