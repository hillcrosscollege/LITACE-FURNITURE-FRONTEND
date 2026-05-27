// app/categories/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Search, SlidersHorizontal, Plus, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import App_Text from "@/components/app_ui/App_Text";
import App_Input from "@/components/app_ui/App_Input";
import App_Button from "@/components/app_ui/App_Button";
import { categories } from "./categories_data/categories_col";
import App_Paginate from "@/components/app_ui/App_Paginate";

type SearchForm = { search: string };

const Categories_View = () => {
  const [page, setPage] = useState(1);
  const {
    register,
    formState: { errors },
  } = useForm<SearchForm>();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <App_Text variant="pageTitle">Categories</App_Text>
          <App_Text variant="pageSub">
            Manage product categories to keep your store organized.
          </App_Text>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search */}
          <App_Input
            name="search"
            register={register}
            errors={errors}
            placeholder="Search categories..."
            showLabel={false}
            icon1={<Search size={14} className="text-muted-foreground" />}
            containerStyle="w-full sm:w-56"
          />

          <div className="flex items-center gap-2">
            <App_Button
              text="Filters"
              icon={<SlidersHorizontal size={13} />}
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto flex-1 sm:flex-none"
            />
            <App_Button
              text="Add Category"
              icon={<Plus size={13} />}
              btnStyle="text-xs bg-[#a0522d] text-white hover:bg-[#8b4513] rounded-lg px-3 py-2 h-auto flex-1 sm:flex-none"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden"
          >
            {/* Cover image */}
            <div className="w-full h-40 bg-[#f0e8df] overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                width={400}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-3">
              <App_Text variant="cardHeading">{category.name}</App_Text>
              <App_Text variant="tableCellMuted" className="mt-0.5">
                {category.productCount} Products
              </App_Text>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 px-3 pb-3">
              <App_Button
                text="Manage"
                btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
              />
              <App_Button
                text=""
                icon={<MoreHorizontal size={15} />}
                btnStyle="p-2 h-auto bg-white border border-[#e0dbd4] text-muted-foreground hover:bg-[#f5f2ee] rounded-lg shadow-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <App_Paginate
        page={page}
        setPage={setPage}
        totalPages={5}
        paginateStyle="mt-2"
      />
    </div>
  );
};

export default Categories_View;
