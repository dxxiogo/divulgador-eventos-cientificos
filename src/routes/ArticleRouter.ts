import ArticleController from "../server/controllers/ArticleController";
import { Router } from "express";
import {isAuthenticated} from "../server/shared/middlewares/Auth";
const ArticleRouter = Router();

ArticleRouter.post("/artigo", isAuthenticated, ArticleController.createArticle);
ArticleRouter.get("/artigo", isAuthenticated ,ArticleController.findAllArticles);
ArticleRouter.get("/artigo/:id", isAuthenticated, ArticleController.findArticle);
ArticleRouter.delete("/artigo/:id", isAuthenticated,ArticleController.deleteArticle);
ArticleRouter.put("/artigo/:id",  isAuthenticated,ArticleController.updateArticle);

export default ArticleRouter;