// "use client";

// import React, {useState} from "react";
// import {Area, Point} from "react-easy-crop";
// import Cropper from "react-easy-crop";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {Button} from "@/components/ui/button";
// import {Slider} from "@/components/ui/slider";
// import getCroppedImg from "../../lib/utils;

// type ImageCropDialogProps = {
//   isOpen: boolean;
//   selectedImage: string | null;
//   onCroppedFile: (file: File | null) => void;
//   onClose: () => void;
// };

// export function ImageCropDialog(
//   {
//     isOpen,
//     selectedImage,
//     onClose,
//     onCroppedFile,
//   }: ImageCropDialogProps
// ) {
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);

//   const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   };

//   const handleCrop = async () => {
//     if (!selectedImage || !croppedAreaPixels) return;

//     try {
//       const croppedFile = await getCroppedImg(selectedImage, croppedAreaPixels);
//       onCroppedFile(croppedFile)
//       setError(null);
//     } catch (error) {
//       setError("Đã xảy ra lỗi. Vui lòng thử lại.");
//     }
//   };

//   const handleOpenChange = async () => {
//     setCrop({ x: 0, y: 0 })
//     setZoom(1)
//   }

//   const handleClose = () => {

//     onClose();
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={handleOpenChange}>
//       <DialogContent className="[&>button]:hidden max-w-[90vw] md:max-w-3xl w-full max-h-[90vh] overflow-y-auto gap-8">
//         <DialogTitle className={"text-center text-xl"}>
//           Chọn ảnh đại diện
//         </DialogTitle>

//         {error && (
//           <DialogDescription className="text-custom-txt-error">
//             {error}
//           </DialogDescription>
//         )}

//         {selectedImage && (
//           <>
//             <div className="relative w-full h-[60vh] max-h-[24rem]">
//               <div className={"absolute top-0 bottom-0 left-0 right-0"}>
//                 <Cropper
//                   image={selectedImage}
//                   crop={crop}
//                   zoom={zoom}
//                   minZoom={0.5}
//                   maxZoom={3}
//                   cropSize={{
//                     width: 300,
//                     height: 300,
//                   }}
//                   aspect={1}
//                   restrictPosition={false}
//                   onCropChange={setCrop}
//                   onZoomChange={setZoom}
//                   onCropComplete={onCropComplete}
//                   cropShape="round"
//                   showGrid={true}
//                   classes={{
//                     containerClassName: "rounded-lg",
//                   }}
//                 />
//               </div>
//             </div>
//           </>
//         )}

//         <div>
//           <Slider
//             value={[zoom]}
//             min={0.5}
//             max={3}
//             step={0.05}
//             defaultValue={[1]}
//             aria-label="Zoom"
//             onValueChange={(value) => setZoom(value[0])}
//             className="w-full"
//           />
//         </div>
//         <div className="flex justify-center gap-4">
//           <Button
//             variant={"outline_primary"}
//             className={"min-w-32"}
//             size={"lg"}
//             onClick={handleClose}
//           >
//             Hủy
//           </Button>
//           <Button
//             variant={"primary"}
//             size={"lg"}
//             className={"min-w-32"}
//             onClick={handleCrop}
//           >
//             Lưu
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
