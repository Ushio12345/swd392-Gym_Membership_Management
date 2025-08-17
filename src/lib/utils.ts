import { type ClassValue, clsx } from "clsx";
// import { $getRoot, ElementNode, LexicalEditor } from "lexical";
import { twMerge } from "tailwind-merge";
// import { $generateHtmlFromNodes } from "@lexical/html";
import { parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function delay(millisecond: number) {
//   return new Promise((resolve) => setTimeout(resolve, millisecond));
// }

// export function isDarkColor(hexColor: string): boolean {
//   const color = hexColor.replace("#", "");

//   const r = parseInt(color.substring(0, 2), 16);
//   const g = parseInt(color.substring(2, 4), 16);
//   const b = parseInt(color.substring(4, 6), 16);

//   const brightness = (r * 299 + g * 587 + b * 114) / 1000;

//   return brightness < 150;
// }

// export function validateImageFile(file: File): {
//   isValid: boolean;
//   error: string | null;
// } {
//   const validTypes = ["image/jpeg", "image/png"];
//   const maxSize = 10 * 1024 * 1024; // 10MB

//   if (!validTypes.includes(file.type)) {
//     return { isValid: false, error: "Vui lòng chọn tệp loại JPEG hoặc PNG." };
//   }
//   if (file.size > maxSize) {
//     return {
//       isValid: false,
//       error: `Tệp không được vượt quá ${maxSize / (1024 * 1024)} MB.`,
//     };
//   }
//   return { isValid: true, error: null };
// }

// export default async function getCroppedImg(
//   imageSrc: string,
//   croppedAreaPixels: { x: number; y: number; width: number; height: number }
// ): Promise<File> {
//   const image = new Image();
//   image.src = imageSrc;

//   return new Promise((resolve, reject) => {
//     image.onload = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       if (!ctx) {
//         reject(new Error("Không thể tạo canvas context"));
//         return;
//       }

//       canvas.width = croppedAreaPixels.width;
//       canvas.height = croppedAreaPixels.height;

//       // Fill the canvas with a white background
//       ctx.fillStyle = "#ffffff";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       ctx.drawImage(
//         image,
//         croppedAreaPixels.x,
//         croppedAreaPixels.y,
//         croppedAreaPixels.width,
//         croppedAreaPixels.height,
//         0,
//         0,
//         croppedAreaPixels.width,
//         croppedAreaPixels.height
//       );

//       canvas.toBlob(
//         (blob) => {
//           if (!blob) {
//             reject(new Error("Xảy ra lỗi trong quá trình xử lý ảnh"));
//             return;
//           }
//           const file = new File([blob], "cropped-image.jpg", {
//             type: "image/jpeg",
//           });
//           resolve(file);
//         },
//         "image/jpeg",
//         1
//       );
//     };

//     image.onerror = () => reject(new Error("Không thể tải ảnh"));
//   });
// }

// export function exportEditorToHtml(editor: LexicalEditor): string {
//   let htmlString = "";
//   editor.getEditorState().read(() => {
//     htmlString = $generateHtmlFromNodes(editor);
//   });
//   return htmlString;
// }

// export function exportEditorToJson(editor: LexicalEditor): string {
//   const editorState = editor.getEditorState();
//   if (editorState.isEmpty()) {
//     return "";
//   }

//   const isEmpty = editorState.read(() => {
//     const root = $getRoot();
//     const firstChild = root.getFirstChild();

//     if (!firstChild) return true;
//     if (firstChild instanceof ElementNode) {
//       return firstChild.getChildrenSize() === 0;
//     }
//     return root.getChildrenSize() === 1;
//   });

//   if (isEmpty) {
//     return "";
//   }

//   return JSON.stringify(editorState.toJSON());
// }

// function escapeHtml(text: string): string {
//   return text
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

// export function lexicalJsonToHtml(
//   data: string | object,
//   editor: LexicalEditor
// ): string {
//   let html = "";
//   try {
//     const jsonString = typeof data === "string" ? data : JSON.stringify(data);
//     const parsed = JSON.parse(jsonString);

//     if (!parsed?.root || !parsed.root.type) {
//       throw new Error("Not Lexical JSON");
//     }

//     const editorState = editor.parseEditorState(jsonString);
//     editor.setEditorState(editorState);
//     editor.update(() => {
//       html = $generateHtmlFromNodes(editor);
//     });
//   } catch (error) {
//     html = `<p>${escapeHtml(String(data))}</p>`;
//   }

//   return html;
// }

// export function convertUnspecificToZone(time: string) {
//   return parseISO(time + "Z");
// }
