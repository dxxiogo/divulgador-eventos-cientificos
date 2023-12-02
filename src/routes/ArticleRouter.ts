import ArticleController from "../server/controllers/ArticleController";
import { Router } from "express";
import {isAuthenticated} from "../server/shared/middlewares/Auth";
const ArticleRouter = Router();
import { upload } from "../server/shared/middlewares/Multer";

ArticleRouter.post("/", isAuthenticated, ArticleController.createArticle);
ArticleRouter.get("/", isAuthenticated ,ArticleController.findAllArticles);
ArticleRouter.get("/:id", isAuthenticated, ArticleController.findArticle);
ArticleRouter.delete("/:id", isAuthenticated,ArticleController.deleteArticle);
ArticleRouter.put("/:id",  isAuthenticated,ArticleController.updateArticle);

export default ArticleRouter;