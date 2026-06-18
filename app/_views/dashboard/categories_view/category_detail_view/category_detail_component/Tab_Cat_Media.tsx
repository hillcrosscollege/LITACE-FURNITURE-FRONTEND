// components/categories/details/tabs/Tab_Cat_Media.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash2, Star, Plus } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { categoryMedia } from "../../categories_data/categories_data";
import { CategoryMedia } from "../../categories_types";

const Tab_Cat_Media = () => {
  const [items, setItems] = useState<CategoryMedia[]>(categoryMedia);
  const [activeTab, setActiveTab] = useState<"Images" | "Videos">("Images");
  const [coverId, setCoverId] = useState(categoryMedia[0]?.id);

  const images = items.filter((i) => i.type === "image");
  const videos = items.filter((i) => i.type === "video");
  const display = activeTab === "Images" ? images : videos;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <App_Text variant="cardHeading">Category Media</App_Text>
        <App_Button
          text="Add Media"
          icon={<Plus size={13} />}
          type="button"
          btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
        />
      </div>

      <div className="flex items-center gap-1 border-b border-[#ede8e2]">
        {(["Images", "Videos"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs border-b-2 transition-colors ${
              activeTab === tab
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground"
            }`}
          >
            {tab}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab ? "bg-primary/10 text-primary" : "bg-[#f5f2ee] text-muted-foreground"}`}
            >
              {tab === "Images" ? images.length : videos.length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {display.map((item) => (
          <div
            key={item.id}
            className="relative group aspect-square rounded-xl overflow-hidden border border-[#ede8e2] bg-[#f0e8df]"
          >
            <Image src={item.url} alt="Media" fill className="object-cover" />
            {coverId === item.id && (
              <span className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full z-10">
                Cover
              </span>
            )}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
              <button
                type="button"
                onClick={() => setCoverId(item.id)}
                className={`p-1.5 rounded-full ${coverId === item.id ? "bg-primary text-white" : "bg-white text-amber-500"}`}
              >
                <Star
                  size={13}
                  fill={coverId === item.id ? "currentColor" : "none"}
                />
              </button>
              <button
                type="button"
                onClick={() =>
                  setItems((p) => p.filter((i) => i.id !== item.id))
                }
                className="p-1.5 bg-white rounded-full text-[#c0392b]"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}

        {/* Add image tile */}
        <button
          type="button"
          className="aspect-square rounded-xl border-2 border-dashed border-[#ede8e2] hover:border-primary/40 flex flex-col items-center justify-center gap-2 transition-colors bg-[#faf9f7]"
        >
          <Plus size={20} className="text-muted-foreground" />
          <App_Text variant="tableCellMuted">Add Image</App_Text>
        </button>
      </div>
    </div>
  );
};

export default Tab_Cat_Media;
