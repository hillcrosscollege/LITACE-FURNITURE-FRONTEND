"use client";

import App_Paginate from "@/components/app_ui/App_Paginate";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { categoriesColumns } from "./categories_data/categories_list_col";
import { Skeleton_Order_Row } from "../orders_view/orders_view_components/Order_Skeleton";
import Category_Header from "./categories_components/Category_Header";
import { useCategoryContext } from "@/app/contexts/admin/Category_Context";
import useTable from "@/app/_hooks/useTable";

const PAGE_SIZE = 5;

const CategoriesPage = () => {
  const { data, isLoading, isError, page, setPage } = useCategoryContext();
  const { tableData, totalPages, startItem, endItem, totalItems } = useTable({
    data: data?.categories,
    page,
    PAGE_SIZE,
  });

  return (
    <>
      <div className="space-y-4">
        <Category_Header />

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <table className="w-full">
                <tbody>
                  {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                    <Skeleton_Order_Row key={i} />
                  ))}
                </tbody>
              </table>
            ) : isError ? (
              <div className="flex items-center justify-center py-16">
                <App_Text variant="tableCellMuted" className="text-[#c0392b]">
                  Failed to load categories. Please try again.
                </App_Text>
              </div>
            ) : (
              <App_Table
                columns={categoriesColumns}
                data={tableData!}
                style="mt-0"
                childRowStyle="hover:bg-[#faf9f7] cursor-pointer"
              />
            )}
          </div>

          {/* Footer */}
          {!isLoading && !isError && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
              <App_Text variant="tableCellMuted" className="shrink-0">
                Showing {startItem + 1} to {endItem} of {totalItems} categories
              </App_Text>
              <App_Paginate
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                paginateStyle="mt-4 mb-4"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
