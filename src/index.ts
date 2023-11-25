import { server } from "./server/Server";
import 'dotenv/config'
import { tryConnection } from "./server/database/MongoConnect";
import { eventsRouter } from "./routes/EventsRouter";
import UserRouter from "./routes/UserRouter";
import ArticleRouter from "./routes/ArticleRouter";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import errorMiddleware from "./server/shared/middlewares/Error";

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Servidor rodando na porta: ' + port);
});

server.use(cookieParser());

server.use(eventsRouter);
server.use(UserRouter);
server.use(ArticleRouter);

server.use(errorMiddleware);

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

tryConnection();