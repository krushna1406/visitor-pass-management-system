const pdfDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

const generateVisitorPass = async (visitor) => {

   const fileName = `${visitor._id}.pdf`;
   const filePath = path.join(__dirname, '../temp/passes', fileName);

   const doc = new pdfDocument({
      size: 'A4',
      margin: 50
   });

   const stream = fs.createWriteStream(filePath);

   doc.pipe(stream);

   doc.fontSize(24)
      .fillColor('#4f46e5')
      .text('VISITOR PASS', {align: 'center'})
   
   doc.moveDown(2)

   if(visitor.qrCode) {
      const qrBinary = visitor.qrCode.replace(/^data:image\/png;base64,/, "");

      const qrBuffer = Buffer.from(qrBinary, 'base64');

      doc.image(qrBuffer, 50, 140, {
         width: 170,
         height: 170,
      });
   }

   doc.fontSize(13)
      .fillColor('black')

   const x = 260;
   let y = 150;

   doc.text(`Name      : ${visitor.name}`, x, y);
   y+= 25;
   doc.text(`Email     : ${visitor.email}`, x, y);
   y+= 25;
   doc.text(`Phone     : ${visitor.phone}`, x, y);
   y+= 25;
   doc.text(`Purpose   : ${visitor.purpose}`, x, y);
   y+= 25;
   doc.text(`Host      : ${visitor.employee.name}`, x, y);
   y+= 25;
   doc.text(`Visit Date: ${new Date(visitor.visitDate).toDateString()}`, x, y);

   doc.moveTo(50, 340)
      .lineTo(545, 340)
      .strokeColor("#d1d5db")
      .stroke();

   
   doc
      .fontSize(10)
      .fillColor("gray")
      .text(
         "Please carry this visitor pass during your visit.", 50, 355, {
            align: "center",
            width: 495,
         }
      );

   doc.end();

   return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(filePath));
      stream.on('error', () => reject)
   })
}

module.exports = generateVisitorPass;