import { server } from "./server/Server";
import 'dotenv/config'
import { tryConnection } from "./server/database/MongoConnect";


const port = process.env.PORT || 5000;

server.listen(3333, () => {
    console.log('Servidor rodando na porta: ' + port);
});

tryConnection();