import { verify } from "jsonwebtoken";
import { DefaultError } from "../../../../@types/types";
import { RequestHandler } from "express";

export const isAuthenticated : RequestHandler = async (req, res, next) => {
  try{
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      let err : DefaultError = { error:"Usuário não autenticado", status: 401};
      return next(err);
    }
    let key : string = process.env.SECRET_KEY as string;
    if (!key) {
      let err : DefaultError = { error:"Chave de autenticação não encontrada", status: 401};
      return next(err);
    }
    await verify(token, key, (err: any, decoded: any) => {
      if (err) {
        let err : DefaultError = { error:"Token inválido", status: 401};
        return next(err);
      }
      req.cookies.UserEmail = decoded.email; 
      next();
    });
  } catch(error) {
    return next(error);
  }
}
