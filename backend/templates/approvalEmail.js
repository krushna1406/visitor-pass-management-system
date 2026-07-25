
const approvalEmail = (visitor) => {
   return `
      <div style="max-width: 650px; margin: auto; font-family: Arial, Helvetica, sans-serif; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">

         <div style="background-color: #16a34a; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Visitor Request Approved</h2>
         </div>

         <div style="padding: 30px; color: #374151; line-height: 1.7;">

            <p>Dear <strong>${visitor.name}</strong>,</p>

            <p>
               We are pleased to inform you that your visitor request has been
               <strong style="color: #16a34a;">approved</strong>.
               Please find your Visitor Pass attached to this email in PDF format.
            </p>

            <div style="background: #f9fafb; border-left: 4px solid #16a34a; padding: 15px; margin: 25px 0;">

               <p style="margin: 6px 0;"><strong>Visitor Name:</strong> ${visitor.name}</p>

               <p style="margin: 6px 0;"><strong>Host:</strong> ${visitor.employee.name}</p>

               <p style="margin: 6px 0;"><strong>Purpose:</strong> ${visitor.purpose}</p>

               <p style="margin: 6px 0;"><strong>Visit Date:</strong> ${new Date(visitor.visitDate).toDateString()}</p>

            </div>

            <p>
               Kindly carry the attached Visitor Pass (printed or on your mobile device)
               and present it to the security personnel at the entrance during your visit.
            </p>

            <p>
               We recommend arriving a few minutes before your scheduled visit time.
               If you are unable to attend, please inform your host in advance.
            </p>

            <br>

            <p>
               We look forward to welcoming you.<br><br>

               Kind Regards,<br>
               <strong>Visitor Pass Management Team</strong>
            </p>

         </div>

         <div style="background-color: #f3f4f6; text-align: center; padding: 15px; font-size: 13px; color: #6b7280;">
            This is an automated email. Please do not reply to this message.
         </div>

      </div>
   `;
};

module.exports = approvalEmail;