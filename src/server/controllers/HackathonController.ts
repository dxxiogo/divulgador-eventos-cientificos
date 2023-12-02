import { RequestHandler } from "express";
import { THackaton, TMinicourse } from "../../../@types/types";
import EventModel from "../models/EventModel";
import HackathonModel from "../models/HackathonModel";
import { ObjectId } from "mongodb";

export const createHackathon: RequestHandler = async (req, res, next) => {
    const data: THackaton = req.body;
    try {
        const event = await EventModel.findById(data.idEvent);
        if(!event)
            return next({message: 'Evento não encontrado', status: 404});
        if(data){
            const newHackathon = new HackathonModel(data)
            await newHackathon.save()
            return res.status(201).json(newHackathon);
        }
        next({message: 'Não foi possível criar o hackathon', status: 400});
    } catch (error) {
        next({message: error, status: 500});
    }
}

export const findAllHackathon: RequestHandler = async (req, res, next) => {
    try{
        const hackathons = await HackathonModel.find();
        if(hackathons)
            return res.status(200).json(hackathons);
            next({message: 'Não há hackathons cadastrados', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

export const findHackathonById: RequestHandler = async (req, res, next) => {
    try{
        const hackathon = await HackathonModel.findById({_id: req.params.id});
        if(hackathon)
            return res.status(200).json(hackathon);
            next({message: 'Hackathon não encontrado', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}


export const deleteHackathon: RequestHandler = async (req, res, next) => {
    try{
      const id = req.params.id
  
      if(!ObjectId.isValid(id)){
        return next({message: 'ID invalido', status: 400});
      }
      const deleted = await HackathonModel.deleteOne({_id: id})
      if (deleted){
        res.status(200).send('Hackathon deletado com sucesso')
      }else{
        next({message: 'Hackathon não encontrado', status: 404});
      }
    }catch(error){
      next({message: error, status: 500});
    }
  }

export const updateHackathon: RequestHandler = async (req, res, next) => {
    try{
        const data: THackaton = req.body;
        const hackathon = await HackathonModel.findById({_id: req.params.id});
        if(hackathon) {
            await hackathon.updateOne({_id: req.params.id}, data);
            return res.status(200).send('Hackathon atualizado com sucesso!');
        }
        next({message: 'Hackathon não encontrado', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}