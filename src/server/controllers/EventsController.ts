import { RequestHandler } from "express";
import EventModel from "../models/EventModel";
import { TEvent, TUser } from "../../../@types/types";
import UserModel from "../models/UserModel";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { ObjectId } from "mongodb";

const createEvent: RequestHandler = async (req, res, next) => {
    const data: TEvent = req.body;
    try {
        let newEvent = null;
        if(data){
            newEvent = new EventModel({
                name: data.name,
                description: data.description,
                endDate: data.endDate,
                startDate: data.startDate,
                feedbacks: [],
                location: data.location,
                organizingCommitte: data.organizingCommitte,
                theme: data.theme,
                photo: {
                    data: req.file?.buffer,
                    contentType: req.file?.mimetype
                },
                participants: []
            })
            await newEvent.save()
            return res.status(201).json(newEvent);
        }
        next({message: 'Não foi possível adicionar o evento!', status: 400});;
    } catch (err) {
        return res.status(500).json({err});
    }
}

const findAllEvents: RequestHandler = async (req, res, next) => {
    try{
        const events = await EventModel.find();
        if(events)
            return res.status(200).json(events);
        return res.status(404).send('Sem eventos cadastrados');
    } catch (error) {
        return res.status(500).json({error})
    }
}

const findEventById: RequestHandler = async (req, res, next) => {
    try{
        const event = await EventModel.findById({_id: req.params.id});
        if(event)
            return res.status(200).json(event);
        next({message: 'Evento não encontrado', status: 404});
    } catch (error) {
        return res.status(500).json({error})
    }
}

const deleteEvent: RequestHandler = async (req, res, next) => {
    try{
      let id = req.params.id
      if(!ObjectId.isValid(id)){
        return next({message: 'ID invalido', status: 400});
      }
      const deleted = await EventModel.deleteOne({_id: id})
      if (deleted.deletedCount > 0){
        res.status(200).send('Evento deletado com sucesso')
      }else{
        next({message: 'Evento não encontrado', status: 404});
      }
    }catch(error){
      next({message: error, status: 500});
    }
  }


  const updateEvent: RequestHandler = async (req, res, next) => {
    try{
        const data: TEvent = req.body;
        const event = await EventModel.findById({_id: req.params.id});
        if(event) {
            await EventModel.updateOne({_id: req.params.id}, data);
            return res.status(200).send('Evento atualizado com sucesso!');
        }
        next({message: 'Evento não encontrado', status: 404});
    } catch (error) {
        next({message: error, status: 500});
    }
}

const UserHistoryEvents: RequestHandler = async (req, res, next) => {    
    try {
        const userId = req.params.userId as string;
        const user = await UserModel.findById({_id: userId}); 
        const events = await EventModel.find();
        if(!user)
            return next({message: 'Usuário não encontrado', status: 404});
        const participededEvents = events.filter(event => {
            if(event.participants.includes(user._id))
                return event;
        })
        return res.status(200).json(participededEvents);
    } catch (err){
        console.log(err);
    }
}

const EventsByLocation: RequestHandler = async (req, res, next) => {    
    try {
        const lat = parseFloat(req.params.lat as string);
        const lng = parseFloat(req.params.lng as string);
        console.log(lat, lng);
        if(!lat || !lng)
            return next({message: "Informe uma localização válida", status: 400})
        const events = await EventModel.find({
            location: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                }
        );
        if(events)
            return res.status(200).send(events);
        next({message: "Não foi possível encontrar eventos com a localização informada", status: 400})
    } catch (error){
        next({message: error, status: 500});
    }
}

const getCertificates: RequestHandler = async (req, res) => {
    try{
        const user : TUser | null = await UserModel.findById(req.params.userid);
        if(user){
            const __dirname = path.resolve();

            const dirPath = path.join(__dirname, 'certificados');
            if (!fs.existsSync(dirPath)){
                fs.mkdirSync(dirPath, { recursive: true });
            }
            const event : TEvent | null = await EventModel.findById(req.params.id);
            if ( !event ) return res.status(404).send('Evento não encontrado!');
            if(event?.participants.includes(user._id)){
                const certificate = createCertificate(event.name, event.startDate.toString(), user.name);
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(certificate);
                await page.emulateMediaType('screen');
                
                const pdf = await page.pdf({
                    path: path.join(__dirname, `certificados/${user.name}-${event.name}-Certificado.pdf`),
                    format: 'A4',
                    printBackground: true
                });
                await browser.close();
                return res.status(200).sendFile(path.join(__dirname, `certificados/${user.name}-${event.name}-Certificado.pdf`));
            }else{
                return res.status(404).send('Usuário não participou do evento');
            }
        }else{
            return res.status(404).send('Usuário não encontrado!');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error})
    }
}

const addParticipant: RequestHandler = async (req, res) => {
    try{
        const user : TUser | null = await UserModel.findOne({email: req.params.email});
        if(user){
            const event : TEvent | null = await EventModel.findById(req.params.id);
            if ( !event ) return res.status(404).send('Evento não encontrado!');
            if(!event?.participants.find(participant => participant === user._id)){
                event.participants.push(user._id);
                await EventModel.updateOne({_id: req.params.id}, event);
                return res.status(200).send('Usuário adicionado ao evento com sucesso!');
            }else{
                return res.status(404).send('Usuário já participou do evento');
            }
        }
        return res.status(404).send('Usuário não encontrado!');
    } catch (error) {
        return res.status(500).json({error})
    }
}

const removeParticipant: RequestHandler = async (req, res) => {
    try{
        const user : TUser | null = await UserModel.findOne({email: req.params.email});
        if(user){
            const event : TEvent | null = await EventModel.findById(req.params.id);
            if ( !event ) return res.status(404).send('Evento não encontrado!');
            if(event?.participants.find(participant => participant === user._id)){
                event.participants = event.participants.filter(participant => participant !== user._id);
                await EventModel.updateOne({_id: req.params.id}, event);
                return res.status(200).send('Usuário removido do evento com sucesso!');
            }else{
                return res.status(404).send('Usuário não participou do evento');
            }
        }
        return res.status(404).send('Usuário não encontrado!');
    } catch (error) {
        return res.status(500).json({error})
    }
}

export default { createEvent, findAllEvents, updateEvent, findEventById, deleteEvent, UserHistoryEvents, EventsByLocation , addParticipant, removeParticipant, getCertificates }

function createCertificate(event : string, date : string, name : string){
    return `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificado de Participação</title>
    
    <style>
    body {
        font-family: 'Arial', sans-serif;
        text-align: center;
    }
    
    .certificate {
        max-width: 800px;
        margin: 50px auto;
        padding: 20px;
        border: 2px solid #333;
        border-radius: 10px;
        background-color: #f8f8f8;
    }
    
    .title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    
    .event-details {
        font-size: 18px;
        margin-bottom: 30px;
    }

    .participant-info {
        font-size: 20px;
        margin-bottom: 30px;
    }
    
    .signature {
        margin-top: 50px;
    }
    </style>
    </head>
    <body>
    
    <div class="certificate">
    <div class="title">Certificado de Participação</div>

    <div class="event-details">
    <p>${event}</p>
    <p>Data: ${date}</p>
    </div>
    
    <div class="participant-info">
    <p>${name}</p>
    <p>Participou do evento como:</p>
        <p>Participante</p>
    </div>

    <div class="signature">
    <p>Assinatura Digital</p>
    </div>
    </div>
    
    </body>
    </html>
    `;
}