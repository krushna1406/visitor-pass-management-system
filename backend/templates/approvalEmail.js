const approvalEmail = (visitor) => {

   return `
      <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 5px; background-color: #f4f4f4b6; font-family: Arial, Helvetica, sans-serif; color: #484848;">

         <h2 style="margin-bottom: 20px; color: #06b300;">
            Visitor Request Approved
         </h2>
         <hr>
         <p>Dear <strong>${visitor.name}</strong>,</p>
         <p>Your visitor request has been approved. Your visitor pass is attached to this email as a PDF.</p>
         <p style="margin-top: 20px;"><strong>Visit Details</strong></p>
   
         <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <tr>
               <td style="padding: 8px 0; width: 140px;">Visitor Name:</td>
               <td style="padding: 8px 0;">${visitor.name}</td>
            </tr>
   
            <tr>
               <td style="padding: 8px 0;">Host:</td>
               <td style="padding: 8px 0;">${visitor.employee.name}</td>
            </tr>

            <tr>
               <td style="padding: 8px 0;">Purpose:</td>
               <td style="padding: 8px 0;">${visitor.purpose}</td>
            </tr>

            <tr>
               <td style="padding: 8px 0;">Visit Date:</td>
               <td style="padding: 8px 0;">
                  ${new Date(visitor.visitDate).toDateString()}
               </td>
            </tr>
         </table>
         <hr>

         <p>Download the attached visit pass and carry it when you visit. you will not be allowed to enter without this pass.</p>
         <p style="margin-top: 25px;">
            Regards,<br>
            <strong>Visitor Pass Management System</strong>
         </p>
         <hr>
         <p style="margin-top: 30px; font-size: 12px; color: #777;">
         This is an automated email. Please do not reply to this email.
         </p>
      </div>
   `;
};
module.exports = approvalEmail;