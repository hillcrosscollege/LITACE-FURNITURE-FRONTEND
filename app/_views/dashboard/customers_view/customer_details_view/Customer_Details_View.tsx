"use client";

import App_Text from "@/components/app_ui/App_Text";
import Block_Customer_Modal from "../customer_modals/Block_Customer_Modal";
import Delete_Customer_Modal from "../customer_modals/Delete_Customer_Modal";
import Edit_Customer_Modal from "../customer_modals/Edit_Customer_Modal";
import Send_Message_Modal from "../customer_modals/Send_Message_Modal";
import { Skeleton_Overview_Tab } from "../customers_components/Customer_Skeleton";
import { detailTabs } from "../cusomer_data/customer_data";
import Customer_Details_Header from "./customer_details_components/Customer_Details_Header";
import { useCustomerContext } from "@/app/contexts/admin/Customer_Context";
import App_Tabs from "@/components/app_ui/App_Tabs";

const Customer_Details_View = () => {
  const {
    setActiveTab,
    showEdit,
    setShowBlock,
    showBlock,
    showDelete,
    showMsg,
    setShowMsg,
    singleCustomerLoading,
    singleCustomerError,
    renderTab,
    activeTab,
    customer,
    id,
  } = useCustomerContext();

  if (singleCustomerError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load customer. Please try again.
        </App_Text>
      </div>
    );

  return (
    <>
      <div className="space-y-4">
        <Customer_Details_Header />
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
          <App_Tabs
            activeTab={activeTab}
            detailTabs={detailTabs}
            setActiveTab={setActiveTab}
          />

          <div className="p-4">
            {singleCustomerLoading ? <Skeleton_Overview_Tab /> : renderTab()}
          </div>
        </div>
      </div>

      {showEdit && customer && <Edit_Customer_Modal />}
      {showBlock && customer && (
        <Block_Customer_Modal
          customerId={id}
          customerName={customer.name}
          onClose={() => setShowBlock(false)}
        />
      )}
      {showDelete && customer && <Delete_Customer_Modal />}
      {showMsg && (
        <Send_Message_Modal customerId={id} onClose={() => setShowMsg(false)} />
      )}
    </>
  );
};

export default Customer_Details_View;
