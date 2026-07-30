const { BrevoClient } = require("@getbrevo/brevo");
const fs = require('fs');

const client = new BrevoClient({
   apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
   try {
      const response = await client.transactionalEmails.sendTransacEmail({
         sender:{
            name: 'VisitDesk',
            email: process.env.EMAIL_USER
         },
         to: [
            { email: to, }
         ],
         subject,
         htmlContent: html,

         attachment: attachments.map(file => ({
            name: file.filename,
            content: fs.readFileSync(file.path).toString("base64")
         }))
      });

      console.log("Email sent:", response);
   } catch (error) {
      console.error(error);
      throw error;
   }
}

module.exports = sendEmail;