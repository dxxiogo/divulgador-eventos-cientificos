import { RequestHandler } from "express";
import { TTeam } from "../../../@types/types";
import TeamModel from "../models/TeamModel";
import { ObjectId } from "mongodb";
import HackathonModel from "../models/HackathonModel";

const createTeam: RequestHandler = async (req, res, next) => {
    const data: TTeam = req.body;
    console.log(data);
    try {
        const hackathon = await HackathonModel.findById(data.idHackathon);
        if(!hackathon)
            return next({message: 'Hackathon informado não encontrado', status: 404});;
        if(data){
            const team = new TeamModel(data)
            await team.save()
            return res.status(201).json(team);
        }
        next({message: 'Não foi possível adicionar um novo time', status: 400});
    } catch (error) {
        next({message: error, status: 500});
    }
}

const findAllTeam: RequestHandler = async (req, res, next) => {
    try{
        const teams = await TeamModel.find();
        if(teams)
            return res.status(200).json(teams);
            next({message: 'Sem times cadastrados', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

const findTeamById: RequestHandler = async (req, res, next) => {
    try{
        const team = await TeamModel.findById({_id: req.params.id});
        if(team)
            return res.status(200).json(team);
        next({message: 'Time não encontrado', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

const deleteTeam : RequestHandler = async (req, res, next) => {
    try{
      const id = req.params.id
  
      if(!ObjectId.isValid(id)){
        return next({message: 'ID invalido', status: 400});
      }
  
      const deleted = await TeamModel.deleteOne({_id: id})
      if (deleted.deletedCount > 0){
        res.status(200).send('Time deletado com sucesso');
      }else{
        next({message: 'Time não encontrado', status: 404});
      }
    }catch(error){
      next({message: error, status: 500});
    }
}

const updateTeam: RequestHandler = async (req, res, next) => {
    try{
        const data: TTeam = req.body;
        const team = await TeamModel.findById({_id: req.params.id});
        if(team) {
            await TeamModel.updateOne({_id: req.params.id}, data);
            return res.status(200).send('Time atualizado com sucesso!');
        }
        next({message: 'Time não encontrado', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

export default { createTeam, findAllTeam, findTeamById, deleteTeam, updateTeam }