import UserController from "../server/controllers/UserController";
import { Router } from "express";
import {isAuthenticated} from "../server/shared/middlewares/Auth";
import { bodyValidator } from "../server/shared/middlewares/BodyValidator";
import { userSchema } from "../server/shared/services/YupSchemas";

const UserRouter = Router();

const userBodyValidator = bodyValidator(userSchema);

UserRouter.post("/registrar", userBodyValidator, UserController.createUser);

UserRouter.post("/login", UserController.loginUser);

UserRouter.get("/", UserController.findAllUsers);

UserRouter.delete("/:email", isAuthenticated, UserController.deleteUser);

UserRouter.put("/:email", userBodyValidator, isAuthenticated, UserController.updateUser);

UserRouter.get("/:email", isAuthenticated, UserController.findUser);

export default UserRouter;