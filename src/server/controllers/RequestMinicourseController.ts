import { RequestHandler } from "express";
import RequestMinicourse from "../models/RequestMinicourseModel";
import { TMinicourse } from "../../../@types/types";
import EventModel from "../models/EventModel";
import { ObjectId } from "mongodb";

export const createRequestMinicourse: RequestHandler = async (req, res, next) => {
    const data: TMinicourse = req.body;
    try {
        const event = await EventModel.findById(data.idEvent);
        if(!event)
            return next({message: 'Evento não encontrado', status: 404});
        if(data){
            const newEvent = new RequestMinicourse(data)
            await newEvent.save()
            return res.status(201).json(newEvent);
        }
        next({message: 'Não foi possível criar a requisição de minicurso', status: 400});
    } catch (error) {
        next({message: error, status: 500});;
    }
}

export const findAllRequestMinicourse: RequestHandler = async (req, res, next) => {
    try{
        const requestMinicourse = await RequestMinicourse.find();
        if(requestMinicourse)
            return res.status(200).json(requestMinicourse);
        next({message: 'Sem requisições de minicursos cadastradas', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

export const findRequestMinicourseById: RequestHandler = async (req, res, next) => {
    try{
        const requestMinicourse = await RequestMinicourse.findById({_id: req.params.id});
        if(requestMinicourse)
            return res.status(200).json(requestMinicourse);
         next({message: 'Requisição de minicurso não encontrada', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}


export const deleteRequestMinicourse : RequestHandler = async (req, res, next) => {
    try{
      const id = req.params.id
  
      if(!ObjectId.isValid(id)){
        return next({message: 'ID invalido', status: 400});
      }
      const deleted = await RequestMinicourse.deleteOne({_id: id})
      if (deleted){
        res.status(200).send('Requisição de minicurso deletada com sucesso')
      }else{
        next({message: 'Requisição de minicurso não encontrada', status: 404});
      }
    }catch(error){
      next({message: error, status: 500});
    }
  }

export const updateRequestMinicourse: RequestHandler = async (req, res, next) => {
    try{
        const data: TMinicourse = req.body;
        const requestMinicourse = await RequestMinicourse.findById({_id: req.params.id});
        if(requestMinicourse) {
            await RequestMinicourse.updateOne({_id: req.params.id}, data);
            return res.status(200).send('Requisição de minicurso atualizada com sucesso!');
        }
         next({message: 'Requisição de minicurso não encontrada', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}