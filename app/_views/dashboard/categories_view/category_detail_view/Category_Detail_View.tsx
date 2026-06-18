"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Pencil, Trash } from "lucide-react";
import {
  categoryDetail,
  categoryDetailTabs,
} from "../categories_data/categories_data";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import Add_Category_Modal from "../categories_modals/Add_Category_Modal";
import Delete_Category_Modal from "../categories_modals/Delete_Category_Modal";
import { useCategoryContext } from "@/app/contexts/admin/Category_Context";
import App_Tabs from "@/components/app_ui/App_Tabs";

const Category_Detail_View = () => {
  const {
    name,
    image,
    description,
    status,
    products,
    subcategories,
    sortOrder,
    createdAt,
    renderTab,
    setActiveTab,
    activeTab,
    setShowEdit,
    showEdit,
    showDelete,
    setShowDelete,
    showMore,
    setShowMore,
  } = useCategoryContext();

  return (
    <>
      <div className="space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5">
          <Link href="/dashboard/categories">
            <App_Text
              variant="tableCellMuted"
              className="hover:text-primary cursor-pointer transition-colors"
            >
              Categories
            </App_Text>
          </Link>
          <ChevronRight size={13} className="text-muted-foreground" />
          <App_Text variant="tableCellMuted" className="text-[#1e1a17]">
            {name}
          </App_Text>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <App_Text variant="pageTitle">{name}</App_Text>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                status === "Active"
                  ? "bg-[#e8fdf0] text-[#157a45]"
                  : "bg-[#fdecea] text-[#a32020]"
              }`}
            >
              {status}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <App_Button
              text="Edit Category"
              icon={<Pencil size={13} />}
              type="button"
              onPress={() => setShowEdit(true)}
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
            />
            <App_Button
              text="Delete Category"
              icon={<Trash size={13} />}
              type="button"
              onPress={() => setShowDelete(true)}
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
            />
          </div>
        </div>

        {/* Image + info */}
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Image */}
            <div className="w-full sm:w-48 h-44 rounded-xl bg-[#f0e8df] overflow-hidden shrink-0">
              <Image
                src={image}
                alt={name}
                width={192}
                height={176}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-3">
              <div>
                <App_Text variant="cardHeading">Description</App_Text>
                <App_Text variant="tableCellMuted" className="mt-1">
                  {showMore ? description : description.slice(0, 80) + "..."}
                </App_Text>
                <button
                  type="button"
                  onClick={() => setShowMore((v) => !v)}
                  className="text-xs text-primary hover:underline mt-1"
                >
                  {showMore ? "Show less" : "Show more"}
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {[
                  { label: "Products", value: products },
                  { label: "Subcategories", value: subcategories },
                  { label: "Sort Order", value: sortOrder },
                  { label: "Created At", value: createdAt },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-[#faf9f7] rounded-xl p-3 border border-[#ede8e2]"
                  >
                    <App_Text variant="tableCellMuted" className="mb-1">
                      {label}
                    </App_Text>
                    <App_Text variant="tableCell" className="font-semibold">
                      {value}
                    </App_Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
          <App_Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            detailTabs={categoryDetailTabs}
          />
          <div className="p-4">{renderTab()}</div>
        </div>
      </div>

      {showEdit && <Add_Category_Modal mode="edit" />}
      {showDelete && <Delete_Category_Modal />}
    </>
  );
};

export default Category_Detail_View;
