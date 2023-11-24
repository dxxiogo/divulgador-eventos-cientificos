import mongoose from "mongoose";
import 'dotenv/config'

tryConnection().catch(err => console.log(err));

export async function tryConnection() {
  if(process.env.MONGO_DATABASE_URL){
    await mongoose.connect(process.env.MONGO_DATABASE_URL).then(() =>{
      console.log('Conectado ao Mongo!')
    }).catch((err) => {
      console.log('Erro ao conectar ao Mongo: ' + err)
    });

  }
}

