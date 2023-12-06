import nodemailer from "nodemailer";
import UserModel from "./models/UserModel";

export function emailStructure(alertType : string, link : string){
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificação de Novo Artigo Científico</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
      }

      header {
        background-color: #007BFF;
        color: #fff;
        padding: 20px;
        text-align: center;
        font-size: 24px;
      }

      .content {
        padding: 20px;
      }

      p {
        line-height: 1.6;
      }

      .cta-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007BFF;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
      }

      footer {
        text-align: center;
        padding: 20px;
        background-color: #007BFF;
        color: #fff;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        Notificação de Novo ${alertType} Científico
      </header>
      <div class="content">
        <p>Prezado(a) usuário,</p>
        <p>Um novo ${alertType} científico foi postado em nosso sistema de gerenciamento de eventos científicos. Ficaríamos felizes em compartilhar essa novidade com você.</p>
        <p>Para acessar o novo ${alertType}, clique no botão abaixo:</p>
        <a href="${link}" class="cta-button">Acessar ${alertType}</a>
        <p>Se você tiver alguma dúvida ou precisar de mais informações, entre em contato conosco.</p>
      </div>
      <footer>
        Sistema de Gerenciamento de Eventos Científicos &copy; 2023
      </footer>
    </div>
  </body>
  </html>
  `;
}

export const sendEmails = async (type : string, id : string) => {
  console.log("Enviando email")
  const testAccount = await nodemailer.createTestAccount();
  console.log(testAccount);
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
  });


  const users = await UserModel.find({wantEmails: true});
  const recievers = users.map(user => user.email);
  console.log(recievers);
  let emailOptions = {
    from: "Sistema de Gerenciamento de Eventos Científicos",
    to: recievers.join(',') as string,
    subject: `Novo ${type} Publicado`,
    html: emailStructure(type, `http://localhost:3000/${type}/${id}`)
  }
  transporter.sendMail(emailOptions).then((info) =>{
    console.log(info);
  }).catch((err)=>{
    console.log(err);
  });
}