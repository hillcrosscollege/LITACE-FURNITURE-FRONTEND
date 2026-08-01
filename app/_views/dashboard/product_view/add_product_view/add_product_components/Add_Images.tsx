// components/products/add/steps/Step_Images.tsx
"use client";

import { useRef, useState } from "react";
import { ImagePlus, X, Star, Upload } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { useProductContext } from "@/app/contexts/admin/Product_Context";
import { useUploadProductImage } from "../../product_hook/useProductMutation";

const MAX_IMAGES = 2;

const Step_Images = () => {
  const { form } = useProductContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [urls, setUrl] = useState<string[]>([]);
  const [cover, setCover] = useState(0);

  // Read from form state — single source of truth
  // const images: string[] = form.watch("images") ?? [];
  // const cover: number = form.watch("coverIndex") ?? 0;

  // const setImages = (next: string[]) => form.setValue("images", next);
  // const setCover = (i: number) => form.setValue("coverIndex", i);

  const canAddMore = images.length < MAX_IMAGES;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const remaining = MAX_IMAGES - images.length;
    const allowed = Array.from(files).slice(0, remaining);

    const newUrls = allowed.map((f) => URL.createObjectURL(f));
    setImages([...images, ...newUrls]);
    setUrl([...urls, ...newUrls]);
  };

  const handleBrowse = () => {
    if (!canAddMore) return;
    fileInputRef.current?.click();
  };

  const removeImage = (i: number) => {
    const next = images.filter((_, idx) => idx !== i);
    setImages(next);
    // If we removed the cover, reset to first image
    if (cover === i) setCover(0);
    // If cover index is now out of bounds, pull it back
    else if (cover > next.length - 1) setCover(Math.max(0, next.length - 1));
  };

  const handleUpload = () => {
    const formData = new FormData();

    // Only upload up to 2 images
    images.forEach((file: File) => {
      formData.append("images", file);
    });

    const { mutate, isPending, isError } = useUploadProductImage();
    mutate(formData);

    // uploadImages(formData, {
    //   onSuccess: (response) => {
    //     console.log("Uploaded:", response);

    //     // Example response:
    //     // [{ url: "https://...", publicId: "products/abc" }]

    //     setValue(
    //       "uploadedImages",
    //       response.map((img: any) => img.url),
    //     );
    //   },
    //   onError: (error) => {
    //     console.error(error);
    //   },
    // });
  };

  return (
    <div className="space-y-6">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Images & Media
        </App_Text>
        <App_Text variant="pageSub">
          Upload up to {MAX_IMAGES} product photos. First image is the cover by
          default.
        </App_Text>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        // Reset value so the same file can be re-selected after removal
        onClick={(e) => {
          (e.target as HTMLInputElement).value = "";
        }}
      />

      {/* Drop zone — only shown when slots are available */}
      {canAddMore ? (
        <div
          onClick={handleBrowse}
          className="border-2 border-dashed border-[#ede8e2] rounded-2xl p-10 flex flex-col items-center gap-3 hover:border-primary/40 transition-colors cursor-pointer bg-[#faf9f7]"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <ImagePlus size={22} className="text-primary" />
          </div>
          <App_Text variant="tableCellMuted">
            PNG, JPG, WEBP · Max 2MB each ·{" "}
            <span className="text-primary font-medium">
              {MAX_IMAGES - images.length} slot
              {MAX_IMAGES - images.length !== 1 ? "s" : ""} remaining
            </span>
          </App_Text>
        </div>
      ) : (
        <div className="border-2 border-dashed border-[#ede8e2] rounded-2xl p-6 flex items-center justify-center gap-2 bg-[#faf9f7]">
          <App_Text variant="tableCellMuted">
            Maximum of {MAX_IMAGES} images reached.
          </App_Text>
          <button
            type="button"
            onClick={() => removeImage(images.length - 1)}
            className="text-xs text-primary hover:underline"
          >
            Remove one to replace
          </button>
        </div>
      )}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className={`relative group aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                cover === i ? "border-primary" : "border-[#ede8e2]"
              }`}
            >
              <img
                src={src}
                alt={`Product image ${i + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Cover badge */}
              {cover === i && (
                <span className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Cover
                </span>
              )}

              {/* Image number */}
              <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {i + 1}/{MAX_IMAGES}
              </span>

              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {cover !== i && (
                  <button
                    type="button"
                    onClick={() => setCover(i)}
                    className="p-1.5 bg-white rounded-full text-amber-500 hover:bg-amber-50 transition-colors"
                    title="Set as cover"
                  >
                    <Star size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="p-1.5 bg-white rounded-full text-[#c0392b] hover:bg-[#fdecea] transition-colors"
                  title="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cover info */}
      {images.length > 1 && (
        <App_Text variant="tableCellMuted">
          Hover an image and click ★ to set it as the cover photo.
        </App_Text>
      )}
      <App_Button
        onPress={handleUpload}
        text="Upload Images"
        icon={<Upload size={12} />}
        btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-1.5 h-auto"
      />
    </div>
  );
};

export default Step_Images;

// // components/products/add/steps/Step_Images.tsx
// "use client";

// import { useState } from "react";
// import { ImagePlus, X, Star } from "lucide-react";
// import { UseFormReturn } from "react-hook-form";
// import App_Button from "@/components/app_ui/App_Button";
// import App_Text from "@/components/app_ui/App_Text";
// import { ProductFormData } from "../add_product_types";
// import { useProductContext } from "@/app/contexts/admin/Product_Context";

// type Props = { form: UseFormReturn<ProductFormData> };

// const Step_Images = () => {
//   const { form } = useProductContext();
//   const [images, setImages] = useState<string[]>([]);
//   const [cover, setCover] = useState<number>(0);

//   // const handleDrop = (e: React.DragEvent) => {
//   //   e.preventDefault();
//   //   const files = Array.from(e.dataTransfer.files);
//   //   const urls = files.map((f) => URL.createObjectURL(f));
//   //   setImages((prev) => [...prev, ...urls]);
//   // };

//   const removeImage = (i: number) => {
//     setImages((prev) => prev.filter((_, idx) => idx !== i));
//     if (cover === i) setCover(0);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <App_Text variant="cardHeading" className="text-base mb-0.5">
//           Images & Media
//         </App_Text>
//         <App_Text variant="pageSub">
//           Upload product photos. First image is the cover by default.
//         </App_Text>
//       </div>

//       {/* Drop zone */}
//       <div
//         // onDragOver={(e) => e.preventDefault()}
//         // onDrop={handleDrop}
//         className="border-2 border-dashed border-[#ede8e2] rounded-2xl p-10 flex flex-col items-center gap-3 hover:border-primary/40 transition-colors cursor-pointer bg-[#faf9f7]"
//       >
//         <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
//           <ImagePlus size={22} className="text-primary" />
//         </div>
//         {/* <App_Text variant="tableCell" className="font-medium">
//           Drag & drop images here
//         </App_Text> */}
//         {/* <App_Text variant="tableCellMuted">or</App_Text> */}
//         <App_Button
//           text="Browse Files"
//           btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
//         />
//         <App_Text variant="tableCellMuted">PNG, JPG up to 2MB each</App_Text>
//       </div>

//       {/* Preview grid */}
//       {images.length > 0 && (
//         <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
//           {images.map((src, i) => (
//             <div
//               key={i}
//               className="relative group aspect-square rounded-xl overflow-hidden border border-[#ede8e2]"
//             >
//               <img src={src} alt="" className="w-full h-full object-cover" />

//               {/* Cover badge */}
//               {cover === i && (
//                 <span className="absolute top-1.5 left-1.5 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
//                   Cover
//                 </span>
//               )}

//               {/* Hover actions */}
//               <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setCover(i)}
//                   className="p-1.5 bg-white rounded-full text-amber-500 hover:bg-amber-50"
//                   title="Set as cover"
//                 >
//                   <Star
//                     size={13}
//                     fill={cover === i ? "currentColor" : "none"}
//                   />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => removeImage(i)}
//                   className="p-1.5 bg-white rounded-full text-[#c0392b] hover:bg-[#fdecea]"
//                 >
//                   <X size={13} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Step_Images;
