"use client";
import App_Paginate from "@/components/app_ui/App_Paginate";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import Edit_Customer_Modal from "./customer_modals/Edit_Customer_Modal";
import { Skeleton_Customer_Row } from "./customers_components/Customer_Skeleton";
import Customer_Header from "./customers_components/Customer_Header";
import { useCustomerContext } from "@/app/contexts/admin/Customer_Context";
import useTable from "@/app/_hooks/useTable";

const CustomersPage = () => {
  const {
    page,
    setPage,
    editId,
    columns,
    data,
    isLoading,
    isError,
    editCustomer,
  } = useCustomerContext();

  const { tableData, totalPages, startItem, endItem, totalItems } = useTable({
    data: data?.customers,
    page,
  });

  // const customers = data?.customers ?? [];

  return (
    <>
      <div className="space-y-4">
        <Customer_Header />
        {/* Table card */}
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
          {isError ? (
            <div className="flex items-center justify-center py-20">
              <App_Text variant="tableCellMuted" className="text-[#c0392b]">
                Failed to load customers. Please try again.
              </App_Text>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                {isLoading ? (
                  <table className="w-full">
                    <tbody>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton_Customer_Row key={i} />
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <App_Table
                    columns={columns}
                    data={tableData!}
                    style="mt-0"
                    childRowStyle="hover:bg-[#faf9f7] cursor-pointer"
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
                <App_Text variant="tableCellMuted" className="shrink-0">
                  {isLoading
                    ? "Loading..."
                    : ` Showing ${startItem + 1} to ${endItem} of ${totalItems} customers`}
                </App_Text>
                <App_Paginate
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                  paginateStyle="mt-4 mb-4"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {editId && editCustomer && <Edit_Customer_Modal />}
    </>
  );
};

export default CustomersPage;
