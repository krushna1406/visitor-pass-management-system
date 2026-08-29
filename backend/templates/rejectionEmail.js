const rejectionEmail = (visitor) => {

   return `
      <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 5px; color: #777; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #333;">

         <h2 style="margin-bottom: 20px; color: #ff9d00;">Visitor Request Update</h2>
         <hr>
         <p>Dear <strong>${visitor.name}</strong>,</p>
         <p>Your visitor request has not been approved at this time.</p>

         <p style="margin-top: 20px;"><strong>Visit Details</strong></p>

         <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <tr>
               <td style="padding: 8px 0; width: 160px;">Visitor Name</td>
               <td style="padding: 8px 0;">${visitor.name}</td>
            </tr>

            <tr>
               <td style="padding: 8px 0;">Host</td>
               <td style="padding: 8px 0;">${visitor.employee.name}</td>
            </tr>

            <tr>
               <td style="padding: 8px 0;">Purpose</td>
               <td style="padding: 8px 0;">${visitor.purpose}</td>
            </tr>

            <tr>
               <td style="padding: 8px 0;">Requested Visit Date</td>
               <td style="padding: 8px 0;">
                  ${new Date(visitor.visitDate).toDateString()}
               </td>
            </tr>
         </table>
         <hr>
         <p>You may submit a new visitor request if another visit is required.</p>

         <p style="margin-top: 25px;">
            Regards,<br><br>
            <strong>Visitor Pass Management System</strong>
         </p>
         <hr>

         <p style="margin-top: 30px; font-size: 12px; color: #777;">
            This is an automated email. Please do not reply to this email.
         </p>
      </div>
   `;
};

module.exports = rejectionEmail;