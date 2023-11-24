import UserController from "../server/controllers/UserController";
import { Router } from "express";
import {isAuthenticated} from "../server/shared/middlewares/Auth";
const UserRouter = Router();

UserRouter.post("/usuario/registrar", UserController.createUser);
UserRouter.post("/usuario/login", UserController.loginUser);
UserRouter.get("/usuario", isAuthenticated ,UserController.findAllUsers);
UserRouter.delete("/usuario/:email", isAuthenticated,UserController.deleteUser);
UserRouter.put("/usuario/:email",  isAuthenticated,UserController.updateUser);
UserRouter.get("/usuario/:email", isAuthenticated, UserController.findUser);

export default UserRouter;