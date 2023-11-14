import { server } from "./server/Server";
import 'dotenv/config'
import { tryConnection } from "./server/database/MongoConnect";
import { eventsRouter } from "./routes/EventsRouter";
import bodyParser from "body-parser";


const port = process.env.PORT || 5000;

server.listen(3333, () => {
    console.log('Servidor rodando na porta: ' + port);
});

server.use(eventsRouter);

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

tryConnection();