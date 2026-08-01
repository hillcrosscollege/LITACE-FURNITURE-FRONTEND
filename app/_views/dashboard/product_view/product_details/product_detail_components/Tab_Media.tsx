// components/products/details/tabs/Tab_Media.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Star, Trash2, Play } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { mediaItems as initialItems, MediaItem } from "../product_detail_data";

const Tab_Media = () => {
  const [items, setItems] = useState<MediaItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<"Images" | "Videos">("Images");
  const [coverId, setCoverId] = useState<string>(
    initialItems.find((i) => i.isCover)?.id ?? "1",
  );

  const images = items.filter((i) => i.type === "image");
  const videos = items.filter((i) => i.type === "video");

  const setCover = (id: string) => setCoverId(id);
  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newItems: MediaItem[] = files.map((f, idx) => ({
      id: `new-${Date.now()}-${idx}`,
      url: URL.createObjectURL(f),
      type: f.type.startsWith("video") ? "video" : "image",
      isCover: false,
    }));
    setItems((prev) => [...prev, ...newItems]);
  };

  const displayItems = activeTab === "Images" ? images : videos;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <App_Text variant="cardHeading">Product Media</App_Text>
          <App_Text variant="tableCellMuted" className="mt-0.5">
            Manage product images and videos.
          </App_Text>
        </div>
        <App_Button
          text="Add Images"
          icon={<ImagePlus size={13} />}
          type="button"
          btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#ede8e2]">
        {(["Images", "Videos"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs border-b-2 transition-colors ${
              activeTab === tab
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-[text]"
            }`}
          >
            {tab}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === tab
                  ? "bg-primary/10 text-primary"
                  : "bg-[#f5f2ee] text-muted-foreground"
              }`}
            >
              {tab === "Images" ? images.length : videos.length}
            </span>
          </button>
        ))}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-[#ede8e2] rounded-2xl p-6 flex flex-col items-center gap-2 hover:border-primary/40 transition-colors cursor-pointer bg-[#faf9f7]"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ImagePlus size={18} className="text-primary" />
        </div>
        <App_Text variant="tableCell" className="font-medium">
          Drag & drop to upload
        </App_Text>
        <App_Text variant="tableCellMuted">PNG, JPG up to 2MB</App_Text>
      </div>

      {/* Media grid */}
      {displayItems.length === 0 ? (
        <div className="flex items-center justify-center py-16 border-2 border-dashed border-[#ede8e2] rounded-2xl">
          <App_Text variant="tableCellMuted">
            No {activeTab.toLowerCase()} added yet.
          </App_Text>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="relative group aspect-square rounded-xl overflow-hidden border border-[#ede8e2] bg-[#f0e8df]"
            >
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt="Product media"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/10">
                  <Play size={24} className="text-white" />
                </div>
              )}

              {/* Cover badge */}
              {coverId === item.id && (
                <span className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-medium z-10">
                  Cover
                </span>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                <button
                  type="button"
                  onClick={() => setCover(item.id)}
                  title="Set as cover"
                  className={`p-1.5 rounded-full transition-colors ${
                    coverId === item.id
                      ? "bg-primary text-white"
                      : "bg-white text-amber-500 hover:bg-amber-50"
                  }`}
                >
                  <Star
                    size={13}
                    fill={coverId === item.id ? "currentColor" : "none"}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 bg-white rounded-full text-[#c0392b] hover:bg-[#fdecea] transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tab_Media;
