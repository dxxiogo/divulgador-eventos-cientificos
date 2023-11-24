import UserModel from "../models/UserModel";
import { TUser } from '../../../@types/types';
import { RequestHandler } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data: TUser = req.body;
    if (data) {
      const userExists = await UserModel.findOne({email: data.email});
      if(userExists){
        return next({ message: "Usuário já cadastrado", status: 400 });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(data.password, salt);
      data.password = hashPassword;
      const newUser = await UserModel.create(data);

      const token = jwt.sign({email: newUser.email}, process.env.SECRET_KEY as string, {expiresIn: process.env.JWT_EXPIRE});

      res.status(201).cookie("token", token).send(newUser);
    }else {
      next({message: 'Dados inválidos', status: 400});
    }
  } catch (error) {
    next({message : error, status: 500});
  }
}

const loginUser : RequestHandler = async (req, res, next) => {
  const {token} = req.cookies;
  if(token){
    return next({error: 'Usuário já autenticado', status: 401})
  }
  const user = await UserModel.findOne({email: req.body.email});
  const password = user?.password as string
  const match = await bcrypt.compare(password, req.body.password);
  if(match){
    const token = jwt.sign({email: user?.email}, process.env.SECRET_KEY as string, {expiresIn: process.env.JWT_EXPIRE});
    res.status(200).cookie("token", token).send(user);
  }
}

const deleteUser : RequestHandler = async (req, res, next) => {
  try{
    let userEmail = req.params.email
    if(userEmail){
      let deleted = await UserModel.deleteOne({
        email: userEmail
      })
      if (deleted){
        res.status(200).send('Usuário deletado com sucesso')
      }else{
        next({message: 'Usuário não encontrado', status: 404});
      }
    }
  }catch(error){
    next({message: error, status: 500});
  }
}

const findUser : RequestHandler = async (req, res, next) => {
  try{
    let userEmail = req.params.email;
    if(userEmail){
      const user = await UserModel.findOne({email: userEmail})
      res.status(200).send(user);
    }else {
      next({message: 'Email inválido', status: 400});
    }
  }catch(error){
    next({message: error, status: 500});
  }
}

const findAllUsers : RequestHandler =async (req , res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    next({message: error, status: 500});
  }
}

const updateUser : RequestHandler = async (req, res, next) => {
  try {
    let userEmail = req.params.email;
    let data: TUser = req.body;
    if(userEmail && data){
      const user = await UserModel.updateOne({email: userEmail}, data);
      res.status(200).send(user);
    }else {
      next({message: 'Dados inválidos', status: 400});
    }
  } catch (error) {
    next({message: error, status: 500});
  }
}

export default { createUser, deleteUser, findUser, findAllUsers, updateUser, loginUser };