"use client";
import App_Header_Text from "@/components/app_ui/App_Header_Text";
import App_Number_Slider from "@/components/app_ui/App_Number_Slider";
import { cn } from "@/lib/utils";
import App_CheckBox from "@/components/app_ui/App_CheckBox";
import { SetStateAction, useState } from "react";
import App_Button from "@/components/app_ui/App_Button";
import { categories } from "@/app/tmp/popularProducts";

const Product_Filter = ({
  style,
  setFilters,
  setPage,
}: {
  style?: string;
  setFilters: React.Dispatch<
    SetStateAction<{
      categories: string[];
      priceRange: number[];
    }>
  >;
  setPage: React.Dispatch<SetStateAction<number>>;
}) => {
  const toggleCategory = (name: string) => {
    setTempCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );
  };

  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [tempPrice, setTempPrice] = useState([0, 1000]);

  const applyFilters = () => {
    setFilters({
      categories: tempCategories,
      priceRange: tempPrice,
    });

    setPage(1);
  };

  const clearFilters = () => {
    setTempCategories([]);
    setTempPrice([0, 1000]);
    setFilters({
      categories: [],
      priceRange: [0, 1000],
    });

    setPage(1);
  };

  return (
    <div
      className={cn("w-[20%] flex flex-col px-6 py-8 lg:p-0 gap-y-6", style)}
    >
      <div className="p-4 bg-white"></div>
      <div className="w-full bg-white flex-1">
        <div className="lg:py-4 lg:px-4 lg:border-b font-semibold">
          <App_Header_Text text="CATEGORIES" type="cardhead" />
        </div>
        <div className="grid grid-cols-3 lg:flex lg:flex-col gap-4 p-4">
          {categories.map((item) => (
            <App_CheckBox
              key={item.name}
              label={item.name}
              checked={tempCategories.includes(item.name)}
              onChange={() => toggleCategory(item.name)}
            />
          ))}
        </div>
      </div>
      <div className="w-full bg-white">
        <div className="lg:py-4 lg:px-4 lg:items-start lg:border-b font-semibold flex lg:flex-col gap-6 items-center w-full">
          <App_Header_Text text="PRICE RANGE" type="cardhead" />
          <App_Number_Slider price={tempPrice} setPrice={setTempPrice} />
        </div>
      </div>
      <App_Button
        text="Apply Filters"
        btnStyle="text-white py-4"
        onPress={applyFilters}
      />
      <App_Button
        text="Clear Filters"
        btnStyle="text-white py-4"
        onPress={clearFilters}
      />

      <div className="hidden lg:block w-full p-4 bg-white h-[20rem]"></div>
    </div>
  );
};

export default Product_Filter;
