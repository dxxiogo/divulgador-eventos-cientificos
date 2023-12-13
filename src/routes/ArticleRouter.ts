import ArticleController from "../server/controllers/ArticleController";
import { Router } from "express";
import {isAuthenticated} from "../server/shared/middlewares/Auth";
const ArticleRouter = Router();
import { upload } from "../server/shared/middlewares/Multer";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { articleSchema } from "../server/shared/services/YupSchemas";

const articleBodyValidator = bodyValidator(articleSchema);
ArticleRouter.use(isAuthenticated);

ArticleRouter.post("/", upload.single('fileContent'), articleBodyValidator, ArticleController.createArticle);

ArticleRouter.get("/", ArticleController.findAllArticles);

ArticleRouter.get("/:id", ArticleController.findArticle);

ArticleRouter.delete("/:id", ArticleController.deleteArticle);

ArticleRouter.put("/:id", articleBodyValidator, ArticleController.updateArticle);

export default ArticleRouter;