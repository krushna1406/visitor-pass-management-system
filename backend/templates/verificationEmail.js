const verificationEmail = (otp) => {

   return `
      <div style="max-width: 600px; margin: auto; font-family: Arial, Helvetica, sans-serif; color: #333;">

         <h2 style="color: #000000;">Verify Your Email</h2>

         <p>Please use the following OTP to verify your email address:</p>
         <p style="font-size: 28px; color: #0ecf00;font-weight: bold; letter-spacing: 6px;">
            ${otp}
         </p>
         <p>This OTP is valid for 2 minutes.</p>

         <p style="margin-top: 25px;">
            Regards,<br>
            <strong>VisitDesk</strong>
         </p>
         <hr>
         <p style="margin-top: 30px; font-size: 12px; color: #777;">
            This is an automated email. Please do not reply to this email.
         </p>
      </div>
   `;
};

module.exports = verificationEmail;