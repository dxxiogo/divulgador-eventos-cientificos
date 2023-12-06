import { RequestHandler } from "express";
import { TMinicourse } from "../../../@types/types";
import EventModel from "../models/EventModel";
import { Minicourse } from "../models/Minicourse";
import RequestMinicourse from "../models/RequestMinicourseModel";
import { ObjectId } from "mongodb";

const createMinicourse: RequestHandler = async (req, res, next) => {
    const reqMinicourseId = req.body.reqMinicourseId as string;

    try {
        const reqMinicourseData = await RequestMinicourse.findById({_id: reqMinicourseId});
        if(!reqMinicourseData)
            return next({message: 'A requisição de criação para esse minicurso não foi encontrada!', status: 404});
        if(reqMinicourseData){
            const newMinicourse = new Minicourse({
                registrants: [],
                idEvent: reqMinicourseData.eventId,
                subject: reqMinicourseData.subject,
                ministering: reqMinicourseData.ministering});

            await newMinicourse.save()
            return res.status(201).json(newMinicourse);
        }
        next({message: 'Não foi possível criar um novo minicurso.', status: 404});
    } catch (error) {
        next({message: error, status: 500});;
    }
}

const findAllMinicourse: RequestHandler = async (req, res, next) => {
    try{
        const minicourses = await Minicourse.find();
        if(minicourses)
            return res.status(200).json(minicourses);
            next({message: 'Não há minicursos cadastrados', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

const findMinicourseById: RequestHandler = async (req, res, next) => {
    try{
        const minicourse = await Minicourse.findById({_id: req.params.id});
        if(minicourse)
            return res.status(200).json(minicourse);
        next({message: 'Minicurso não encontrado', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

const deleteMinicourse : RequestHandler = async (req, res, next) => {
    try{
        const id = req.params.id
        if(!ObjectId.isValid(id)){
        return next({message: 'ID invalido', status: 400});
        }
        const deleted = await Minicourse.deleteOne({_id: id})
        if (deleted.deletedCount > 0){
        res.status(200).send('Minicurso deletado com sucesso')
        }
    return next({message: 'Minicurso não encontrado', status: 404});
    }catch(error){
        next({message: error, status: 500});
    }
}


const updateMinicourse: RequestHandler = async (req, res, next) => {
    try{
        const data: TMinicourse = req.body;
        const minicourse = await Minicourse.findById({_id: req.params.id});
        if(minicourse) {
            await Minicourse.updateOne({_id: req.params.id}, data);
            return res.status(200).send('Minicurso atualizado com sucesso!');
        }
        next({message: 'Minicurso não encontrado', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

export default { createMinicourse, findAllMinicourse, findMinicourseById, deleteMinicourse, updateMinicourse }