const { BrevoClient } = require("@getbrevo/brevo");
const fs = require('fs');

const client = new BrevoClient({
   apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
   try {
      const emailData = {
         sender:{
            name: 'VisitDesk',
            email: process.env.EMAIL_USER
         },
         to: [
            { email: to, }
         ],
         subject,
         htmlContent: html
      };

      if(attachments.length > 0) {
         emailData.attachment = attachments.map(file => ({
            name: file.filename,
            content: fs.readFileSync(file.path).toString("base64")
         }))
      }

      await client.transactionalEmails.sendTransacEmail(emailData);

   } catch (error) {
      console.error(error);
      throw error;
   }
}

module.exports = sendEmail;