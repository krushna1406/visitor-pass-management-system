import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const QRScanner = ({ onScanSuccess }) => {

   useEffect(() => {

      const scanner = new Html5QrcodeScanner( "reader",
         {
            fps: 10,
            qrbox: {
               width: 250,
               height: 250
            }
         },
         false
      );
      scanner.render(
         (decodedText) => {
            scanner.clear();
            onScanSuccess(decodedText);
         },
         (error) => {}
      );
      return () => {
         scanner.clear().catch(() => {});
      }
   }, []);

   return (
      <div
         id="reader"
         className="w-full max-w-md mx-auto"
      ></div>
   );
};

export default QRScanner;