import { RequestHandler } from 'express';
import jwt from "jsonwebtoken";
import { DefaultError } from '../../../../@types/types';

const isAuthenticated : RequestHandler = async (req, res, next) => {
  try{
    const {token} = req.cookies;
    console.log(token)
    if (!token){
      let err : DefaultError = { error:"Usuário não autenticado", status: 401};
      next(err);
    }
    let key : string = process.env.SECRET_KEY as string;
    if (!key){
      let err : DefaultError = { error:"Chave de autenticação não encontrada", status: 401};
      next(err)
    }
    await jwt.verify(token, key, (err: any, decoded: any)=>{
      if (err){
        let err : DefaultError = { error:"Token invalido", status: 401};
        return next(err);
      }
      //Manda o email do usuário para o cookie da requisição
      req.cookies.UserEmail = decoded.email ;
      next();
    });
  }catch(error){
    return next(error);
  }
}

export {isAuthenticated};