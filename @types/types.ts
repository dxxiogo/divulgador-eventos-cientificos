import { ObjectId } from "mongodb";

export type TUser = {
    _id: ObjectId
    email: string,
    name: string,
    age: number,
    password: string,
    address: string,
    educationLevel: string
}

export type TArticle ={
    writerId?: String,
    title: String,
    theme: String,
    content: String,
    fileContent: {
        data: Buffer | undefined,
        contentType: String | undefined
    },
    publicationDate: Date,
    presentationDate: Date
};

export type TFeedback = {
    date: Date,
    user: TUser,
    content: string,
    idEvent: string
}

export type TEvent = {
    name: string,
    description: string,
    theme: string,
    organizingCommitte: string,
    startDate: Date,
    endDate: Date,
    organizer: string,
    photo: {
        data: Buffer,
        contentType: String
    },
    location:  {
        type: 'Point',
        coordinates: number[]
    },
    feedbacks: TFeedback[],
    participants: ObjectId[]
}

export type DefaultError = {
    error: string,
    status: number
}

export type TMinicourse = {
    subject: string,
    ministering: string,
    registrants?: string[]
    eventId: string
}

export type THackaton = { 
    name: string,
    teams: string[],
    idEvent: string
} 

export type TTeam = {
    name: string,
    members: string[],
    idHackathon: string
}