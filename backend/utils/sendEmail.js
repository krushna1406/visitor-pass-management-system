const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure: false,
   requireTLS: true,

   connectionTimeout: 10000,
   greetingTimeout: 10000,
   socketTimeout: 10000,

   logger: true,
   debug: true,

   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
   }
});

const sendEmail = async ({ to, subject, html, attachments = [] }) => {

   console.log("EMAIL_USER:", process.env.EMAIL_USER);
   console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

   console.log('Verifying transporter...');
   transporter.verify();

   console.log('Transporter Verified');

   try {
      const info = await transporter.sendMail({
         from: process.env.EMAIL_USER,
         to,
         subject,
         html,
         attachments
      })
      
   }catch(error){
      console.error("sendMail error:", err);
   }
}

module.exports = sendEmail