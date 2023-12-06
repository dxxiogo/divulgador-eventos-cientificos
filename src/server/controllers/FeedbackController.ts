import { RequestHandler } from "express";
import { TFeedback, TMinicourse } from "../../../@types/types";
import EventModel from "../models/EventModel";
import FeedbackModel from "../models/FeedbackModel";
import { ObjectId } from "mongodb";

const createFeedback: RequestHandler = async (req, res, next) => {
    const data: TFeedback = req.body;
    try {
        const event = await EventModel.findById(data.idEvent);
        if(!event)
            return next({message: 'O evento informado não foi encontrado!', status: 404});
        if(data){
            const newEvent = new FeedbackModel(data)
            await newEvent.save()
            return res.status(201).json(newEvent);
        }
        next({message: 'Não foi possível criar o feedback', status: 400});
    } catch (error) {
        next({message: error, status: 500});
    }
}

const findAllFeedback: RequestHandler = async (req, res, next) => {
    try{
        const feedbacks = await FeedbackModel.find();
        if(feedbacks)
            return res.status(200).json(feedbacks);
        return res.status(404).send('Sem feedbacks cadastrados');
    } catch (error) {
        next({message: error, status: 500});
    }
}

const findFeedbackById: RequestHandler = async (req, res, next) => {
    try{
        const feedback = await FeedbackModel.findById({_id: req.params.id});
        if(feedback)
            return res.status(200).json(feedback);
        next({message: 'Feedback não encontrado', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

const deleteFeedback : RequestHandler = async (req, res, next) => {
    try{
      const id = req.params.id
      if(!ObjectId.isValid(id)){
        return next({message: 'ID invalido', status: 400});
      }
      const deleted = await FeedbackModel.deleteOne({_id: id})
      if (deleted.deletedCount > 0){
        res.status(200).send('Feedback deletado com sucesso')
      }else{
        next({message: 'Feedback não encontrado', status: 404});
      }
    }catch(error){
      next({message: error, status: 500});
    }
  }


  const updateFeedback: RequestHandler = async (req, res, next) => {
    try{
        const data: TFeedback = req.body;
        const feedback = await FeedbackModel.findById({_id: req.params.id});
        if(feedback) {
            await feedback.updateOne({_id: req.params.id}, data);
            return res.status(200).send('Feedback atualizado com sucesso!');
        }
        next({message: 'Feedback não encontrado', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

export default { createFeedback, findAllFeedback, updateFeedback, findFeedbackById, deleteFeedback }