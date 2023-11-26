import ArticleModel from "../models/ArticleModel";
import { TArticle } from '../../../@types/types';
import { RequestHandler, Response } from 'express';
import { ObjectId } from "mongodb";
import { sendEmails } from "../EmailConfig";

const createArticle: RequestHandler = async (req, res, next) => {
  try {
    const data: TArticle = req.body;
    if (data) {
      const newArticle = await ArticleModel.create(data);
      sendEmails("Artigo", newArticle._id.toString());
      res.status(201).send(newArticle);
    }else {
      next({message: 'Dados inválidos', status: 400});
    }
  } catch (error) {
    next({message : error, status: 500});
  }
}

const deleteArticle : RequestHandler = async (req, res, next) => {
  try{
    let id = req.params.id

    if(!ObjectId.isValid(id)){
      return next({message: 'ID invalido', status: 400});
    }

    let deleted = await ArticleModel.deleteOne({_id: id})
    if (deleted){
      res.status(200).send('Artigo deletado com sucesso')
    }else{
      next({message: 'Artigo não encontrado', status: 404});
    }
  }catch(error){
    next({message: error, status: 500});
  }
}

const findArticle : RequestHandler = async (req, res, next) => {
  try{
    let id = req.params.id;
    if(!ObjectId.isValid(id)){
      return next({message: 'ID invalido', status: 400});
    }

    let article = await ArticleModel.findOne({_id: id});

    if(!article) return next({message: 'Artigo não encontrado', status: 404});

    if(article?.writer){
      article = await article.populate('writer', '-password')
    }
    res.status(200).send(article);
  }catch(error){
    next({message: error, status: 500});
  }
}

const findAllArticles : RequestHandler =async (req , res, next) => {
  try {
    const articles = await ArticleModel.find();
    for (let i in articles) {
      if(articles[i].writer){
        articles[i] = await articles[i].populate('writer', '-password')
      }
    }
    res.status(200).send(articles);
  } catch (error) {
    next({message: error, status: 500});
  }
}

const updateArticle: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data: TArticle = req.body;

    if (!ObjectId.isValid(id)) {
      return next({ message: 'ID inválido', status: 400 });
    }

    const article = await ArticleModel.findById(id);

    if (!article) {
      return next({ message: 'Artigo não encontrado', status: 404 });
    }

    let updatedArticle = await ArticleModel.findByIdAndUpdate(id, data, { new: true });

    if(updatedArticle?.writer){
      updatedArticle = await updatedArticle.populate('writer', '-password')
    }

    res.status(200).send(updatedArticle);
  } catch (error) {
    next({ message: error, status: 500 });
  }
}

export default { createArticle, deleteArticle, findArticle, findAllArticles, updateArticle };