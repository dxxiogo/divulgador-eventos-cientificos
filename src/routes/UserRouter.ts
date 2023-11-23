import UserController from "../server/controllers/UserController";
import { Router } from "express";

const UserRouter = Router();

UserRouter.get("/usuario", UserController.findAllUsers);
UserRouter.post("/usuario", UserController.createUser);
UserRouter.delete("/usuario/:email", UserController.deleteUser);
UserRouter.put("/usuario/:email", UserController.updateUser);
UserRouter.get("/usuario/:email", UserController.findUser);

export default UserRouter;