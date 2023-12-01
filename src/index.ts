import { server } from "./server/Server";
import 'dotenv/config'
import { tryConnection } from "./server/database/MongoConnect";
import { eventsRouter } from "./routes/EventsRouter";
import UserRouter from "./routes/UserRouter";
import ArticleRouter from "./routes/ArticleRouter";
import bodyParser from "body-parser";
import cors from 'cors';
import errorMiddleware from "./server/shared/middlewares/Error";
import cookieParser from "cookie-parser";
import { requestMinicoursesRouter } from "./routes/RequestMinicourseRouter";
import { minicoursesRouter } from "./routes/MinicourseRouter";
import { feedbackRouter } from "./routes/FeedbackRouter";

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Servidor rodando na porta: ' + port);
});

server.use(cors());
server.use(cookieParser());

server.use('/evento', eventsRouter);
server.use('/usuario', UserRouter);
server.use('/artigo', ArticleRouter);
server.use('/requesicao-minicurso', requestMinicoursesRouter);
server.use('/minicurso', minicoursesRouter)
server.use('/feedback', feedbackRouter);

server.use(errorMiddleware);

server.use(bodyParser.urlencoded({ extended: false }))

server.use(bodyParser.json())

tryConnection();