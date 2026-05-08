"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Filter } from "lucide-react";
import Product_Filter from "./Product_Filter";

const Mobile_Product_Filter = () => {
  return (
    <div className="lg:hidden">
      {/* Trigger button */}
      <Dialog>
        <DialogOverlay />
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md">
            <Filter size={18} />
            Filters
          </button>
        </DialogTrigger>

        {/* Modal content */}
        <DialogContent className="min-w-[90%] lg:hidden md:min-w-[60%] border-0 overflow-y-auto p-0 bg-white">
          {/* <Product_Filter style="w-full" /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Mobile_Product_Filter;
