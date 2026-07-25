const rejectionEmail = (visitor) => {
   return `
      <div style="max-width: 650px; margin: auto; font-family: Arial, Helvetica, sans-serif; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">

         <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Visitor Request Update</h2>
         </div>

         <div style="padding: 30px; color: #374151; line-height: 1.7;">

            <p>Dear <strong>${visitor.name}</strong>,</p>

            <p>
               Thank you for your interest in visiting our organization.
               After reviewing your request, we regret to inform you that your visitor request has not been approved at this time due to some issues.
            </p>

            <div style="background: #f9fafb; border-left: 4px solid #dc2626; padding: 15px; margin: 25px 0;">

               <p style="margin: 6px 0;"><strong>Visitor Name:</strong> ${visitor.name}</p>

               <p style="margin: 6px 0;"><strong>Host:</strong> ${visitor.employee.name}</p>

               <p style="margin: 6px 0;"><strong>Purpose:</strong> ${visitor.purpose}</p>

               <p style="margin: 6px 0;"><strong>Requested Visit Date:</strong> ${new Date(visitor.visitDate).toDateString()}</p>

            </div>

            <p>
               This decision may be due to scheduling constraints or other internal considerations.
               If you believe this request should be reconsidered, please contact your host for further assistance.
            </p>

            <p>
               We appreciate your understanding and hope to welcome you on a future occasion.
            </p>

            <br>

            <p>
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

module.exports = rejectionEmail;