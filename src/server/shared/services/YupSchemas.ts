import * as yup from 'yup';

export const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required().min(3),
  age: yup.number().integer().positive(),
  password: yup.string().required(),
  address: yup.string(),
  educationLevel: yup.string(),
  wantEmails: yup.boolean(),
});


export const articleSchema = yup.object().shape({
    writer: yup.string(),
    title: yup.string().required(),
    theme: yup.string(),
    content: yup.string(),
    publicationDate: yup.date(),
    presentationDate: yup.date(),
  });

  
export const eventSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    theme: yup.string().required(),
    organizer: yup.string().required(),
    organizingCommitte: yup.string(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    photo: yup.object().shape({
      data: yup.mixed(),
      contentType: yup.string(),
    }),
    participants: yup.array().of(yup.string().required()),
    feedbacks: yup.array().of(yup.string().required()),
  });

export const feedbackSchema = yup.object().shape({
    date: yup.date().required(),
    user: yup.string().required(),
    content: yup.string().required(),
    idEvent: yup.string().required(),
  });

export const hackathonSchema = yup.object().shape({
    name: yup.string().required(),
    teams: yup.array().of(yup.string().required()),
    idEvent: yup.string().required(),
  });

export const minicourseSchema = yup.object().shape({
    subject: yup.string().required(),
    ministering: yup.string().required(),
    registrants: yup.array().of(yup.string().required()),
    idEvent: yup.string().required(),
  });

export const requestMinicourseSchema = yup.object().shape({
    subject: yup.string().required(),
    ministering: yup.string().required(),
    eventId: yup.string().required(),
  });
  

export const teamSchema = yup.object().shape({
    name: yup.string().required(),
    members: yup.array().of(yup.string().required()),
    idHackathon: yup.string().required(),
  });


