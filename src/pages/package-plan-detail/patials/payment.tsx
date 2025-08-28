// import { toast } from "react-toastify";
// import { Button } from "../../../components/ui/button";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
// } from "../../../components/ui/dialog"; // Giả định sử dụng shadcn/ui Dialog

// const PaymentReturn = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState<string | null>(null);
//   const [qrUrl, setQrUrl] = useState<string | null>(null); // State để lưu URL QR

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const responseCode = query.get("vnp_ResponseCode");

//     if (responseCode === "00") {
//       setStatus("success");
//       toast.success("Payment successful! 🎉", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       // Tạo URL QR (giả định lấy từ dữ liệu thanh toán, tạm thời dùng ví dụ)
//       const amount = 500000; // Giả định giá trị
//       const accountNo = "0001478603300";
//       const accountName = "HUYNH THI QUE ANH";
//       const acqId = "970422";
//       const addInfo = encodeURIComponent("Thanh toan don hang #12345"); // Giả định order ID
//       const qrUrlGenerated = `https://img.vietqr.io/image/${acqId}-${accountNo}-R6zhNLf.png?amount=${amount}&addInfo=${addInfo}&accountName=${encodeURIComponent(
//         accountName
//       )}`;
//       setQrUrl(qrUrlGenerated); // Lưu URL QR để hiển thị trong popup
//     } else {
//       setStatus("failed");
//       toast.error("Payment failed! ❌ Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       setTimeout(() => navigate("/"), 3000); // Redirect sau 3 giây nếu thất bại
//     }
//   }, [location, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       {status && (
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">
//             {status === "success"
//               ? "Payment Successful! 🎉"
//               : "Payment Failed! ❌"}
//           </h2>
//           {status === "success" && qrUrl && (
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button variant="primary" className="mt-4">
//                   View QR Code
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="max-w-md">
//                 <h3 className="text-lg font-semibold mb-2">Scan to Pay</h3>
//                 <img
//                   src={qrUrl}
//                   alt="Payment QR Code"
//                   className="w-full h-auto rounded-lg"
//                 />
//                 <p className="text-sm text-text-secondary mt-2">
//                   Please scan the QR code to complete your payment.
//                 </p>
//                 <Button
//                   variant="secondary"
//                   className="mt-4 w-full"
//                   onClick={() => navigate("/")}
//                 >
//                   Close
//                 </Button>
//               </DialogContent>
//             </Dialog>
//           )}
//           <Button
//             variant="outline"
//             className="mt-4"
//             onClick={() => navigate("/")}
//           >
//             Back to Home
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentReturn;
