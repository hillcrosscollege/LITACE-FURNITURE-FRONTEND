"use client";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { ChevronRight, MessageSquare, Pencil } from "lucide-react";
import { customerStatusStyles } from "../../cusomer_data/customer_col";
import { statCards } from "../../cusomer_data/customer_data";
import { Skeleton_Customer_Header } from "../../customers_components/Customer_Skeleton";
import More_Drop_Down from "./More_Drop_Down";
import Image from "next/image";
import Link from "next/link";
import { useCustomerContext } from "@/app/contexts/admin/Customer_Context";

const Customer_Details_Header = () => {
  const {
    setActiveTab,
    setShowEdit,
    setShowBlock,
    setShowDelete,
    setShowMsg,
    customer,
    singleCustomerLoading,
  } = useCustomerContext();
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5">
        <Link href="/dashboard/customers">
          <App_Text
            variant="tableCellMuted"
            className="hover:text-primary cursor-pointer transition-colors"
          >
            Customers
          </App_Text>
        </Link>
        <ChevronRight size={13} className="text-muted-foreground" />
        <App_Text variant="tableCellMuted" className="text-[text]">
          {singleCustomerLoading ? "Loading..." : customer?.name}
        </App_Text>
      </div>

      {/* Header card */}
      {singleCustomerLoading ? (
        <Skeleton_Customer_Header />
      ) : (
        customer && (
          <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5 space-y-5">
            {/* Top row */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#f0e8df] shrink-0">
                <Image
                  src={customer.avatar}
                  alt={customer.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <App_Text variant="pageTitle">{customer.name}</App_Text>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${customerStatusStyles[customer.status]}`}
                  >
                    {customer.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                  <App_Text variant="tableCellMuted">{customer.email}</App_Text>
                  <App_Text variant="tableCellMuted">
                    · {customer.phone}
                  </App_Text>
                </div>
                <App_Text variant="tableCellMuted">
                  Customer ID: {customer.customerId} · Joined on{" "}
                  {customer.joinedOn}
                </App_Text>
              </div>

              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <App_Button
                  text="Message"
                  icon={<MessageSquare size={13} />}
                  type="button"
                  onPress={() => setShowMsg(true)}
                  btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
                />
                <App_Button
                  text="Edit"
                  icon={<Pencil size={13} />}
                  type="button"
                  onPress={() => setShowEdit(true)}
                  btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
                />
                <More_Drop_Down
                  setShowBlock={setShowBlock}
                  setShowDelete={setShowDelete}
                />
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {statCards.map(({ key, label, icon: Icon, link, color }) => {
                const value =
                  key === "totalSpent"
                    ? `R ${Number(customer[key as keyof typeof customer]).toLocaleString()}`
                    : String(customer[key as keyof typeof customer]);
                return (
                  <div
                    key={key}
                    className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3 space-y-1"
                  >
                    <App_Text variant="tableCellMuted">{label}</App_Text>
                    <App_Text
                      variant="statValue"
                      className={`text-xl ${color}`}
                    >
                      {value}
                    </App_Text>
                    <button
                      type="button"
                      onClick={() => setActiveTab(link)}
                      className="text-[10px] text-primary hover:underline"
                    >
                      View {link.toLowerCase()}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Customer_Details_Header;
