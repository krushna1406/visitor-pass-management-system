
const approvalEmail = (visitor) => {
   return `
      <!DOCTYPE html>
      <html>
      <head>
         <style>
            body{
               margin:0;
               padding:40px 20px;
               background:#f3f6fb;
               font-family:Arial, Helvetica, sans-serif;
               color:#374151;
            }

            .container{
               max-width:600px;
               margin:auto;
               background:#ffffff;
               border:1px solid #e5e7eb;
               border-radius:12px;
               padding:35px;
               box-shadow:0 8px 24px rgba(0,0,0,.08);
            }

            h2{
               margin:0 0 25px;
               font-size:28px;
               color:#4f46e5;
               font-weight:700;
               text-align:center;
            }

            p{
               margin:16px 0;
               font-size:15px;
               line-height:1.7;
               color:#4b5563;
            }

            strong{
               color:#111827;
            }

            table{
               width:100%;
               margin-top:24px;
               border-collapse:separate;
               border-spacing:0;
               border:1px solid #e5e7eb;
               border-radius:10px;
               overflow:hidden;
            }

            td{
               padding:14px 16px;
               border-bottom:1px solid #e5e7eb;
               font-size:15px;
            }

            tr:last-child td{
               border-bottom:none;
            }

            td:first-child{
               width:35%;
               background:#f9fafb;
               font-weight:600;
               color:#374151;
            }

            td:last-child{
               color:#111827;
            }

            .footer{
               margin-top:35px;
               padding-top:18px;
               border-top:1px solid #e5e7eb;
               text-align:center;
               font-size:13px;
               color:#6b7280;
            }
         </style>
      </head>

      <body>

         <div class="container">

            <h2>Visitor Request Approved</h2>

            <p>Hello <strong>${visitor.name}</strong>,</p>

            <p>Your visitor request has been approved.</p>

            <table>

               <tr>
                  <td><strong>Host</strong></td>
                  <td>${visitor.employee.name}</td>
               </tr>

               <tr>
                  <td><strong>Purpose</strong></td>
                  <td>${visitor.purpose}</td>
               </tr>

               <tr>
                  <td><strong>Visit Date</strong></td>
                  <td>${new Date(visitor.visitDate).toDateString()}</td>
               </tr>

            </table>

            <p style="margin-top:25px;">
               Your visitor pass is attached with this email.
            </p>

            <div class="footer">
               Visitor Pass Management System
            </div>

         </div>

      </body>
      </html>
   `;
};

module.exports = approvalEmail;