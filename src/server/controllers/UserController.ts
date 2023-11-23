import UserModel from "../models/UserModel";
import { TUser } from "../../../@types/types";
import { RequestHandler } from "express";


const createUser: RequestHandler = async (req, res) => {
  try {
    const data: TUser = req.body;
    if (data) {
      const newUser = await UserModel.create(data);
      res.status(201).json(newUser);
    }else {
      res.status(400).send('Dados inválidos');
    }
  } catch (error) {
    res.status(500).send({error});
  }
}

const deleteUser : RequestHandler = async (req, res) => {
  try{
    let userEmail = req.params.email
    if(userEmail){
      let deleted = await UserModel.deleteOne({
        email: userEmail
      })
      if (deleted){
        res.status(200).send('Usuário deletado com sucesso')
      }else{
        res.status(404).send('Usuário não encontrado')
      }
    }
  }catch(error){
    res.status(500).send({error})
  }
}

const findUser : RequestHandler = async (req, res) => {
  try{
    let userEmail = req.params.email;
    if(userEmail){
      const user = await UserModel.findOne({email: userEmail})
      res.status(200).send(user);
    }else {
      res.status(400).send('Email inválido');
    }
  }catch(error){
    res.status(500).send({error})
  }
}

const findAllUsers : RequestHandler =async (req , res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({error})
  }
}

const updateUser : RequestHandler = async (req, res) => {
  try {
    let userEmail = req.params.email;
    let data: TUser = req.body;
    if(userEmail && data){
      const user = await UserModel.updateOne({email: userEmail}, data);
      res.status(200).send(user);
    }else {
      res.status(400).send('Dados inválidos');
    }
  } catch (error) {
    res.status(500).send({error})
  }
}

export default { createUser, deleteUser, findUser, findAllUsers, updateUser };