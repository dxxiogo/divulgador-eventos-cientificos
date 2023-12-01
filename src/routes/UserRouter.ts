import UserController from "../server/controllers/UserController";
import { Router } from "express";
import {isAuthenticated} from "../server/shared/middlewares/Auth";
const UserRouter = Router();

UserRouter.post("/registrar", UserController.createUser);
UserRouter.post("/login", UserController.loginUser);
UserRouter.get("/", isAuthenticated ,UserController.findAllUsers);
UserRouter.delete("/:email", isAuthenticated,UserController.deleteUser);
UserRouter.put("/:email",  isAuthenticated,UserController.updateUser);
UserRouter.get("/:email", isAuthenticated, UserController.findUser);

export default UserRouter;