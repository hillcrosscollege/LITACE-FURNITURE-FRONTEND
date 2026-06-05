// components/products/add/steps/Step_Images.tsx
"use client";

import { useState } from "react";
import { ImagePlus, X, Star } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { ProductFormData } from "../add_product_types";

type Props = { form: UseFormReturn<ProductFormData> };

const Step_Images = ({ form }: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [cover, setCover] = useState<number>(0);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls]);
  };

  const removeImage = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    if (cover === i) setCover(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Images & Media
        </App_Text>
        <App_Text variant="pageSub">
          Upload product photos. First image is the cover by default.
        </App_Text>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-[#ede8e2] rounded-2xl p-10 flex flex-col items-center gap-3 hover:border-primary/40 transition-colors cursor-pointer bg-[#faf9f7]"
      >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <ImagePlus size={22} className="text-primary" />
        </div>
        <App_Text variant="tableCell" className="font-medium">
          Drag & drop images here
        </App_Text>
        <App_Text variant="tableCellMuted">or</App_Text>
        <App_Button
          text="Browse Files"
          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
        />
        <App_Text variant="tableCellMuted">PNG, JPG up to 2MB each</App_Text>
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative group aspect-square rounded-xl overflow-hidden border border-[#ede8e2]"
            >
              <img src={src} alt="" className="w-full h-full object-cover" />

              {/* Cover badge */}
              {cover === i && (
                <span className="absolute top-1.5 left-1.5 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Cover
                </span>
              )}

              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCover(i)}
                  className="p-1.5 bg-white rounded-full text-amber-500 hover:bg-amber-50"
                  title="Set as cover"
                >
                  <Star
                    size={13}
                    fill={cover === i ? "currentColor" : "none"}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="p-1.5 bg-white rounded-full text-[#c0392b] hover:bg-[#fdecea]"
                >
                  <X size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Step_Images;
