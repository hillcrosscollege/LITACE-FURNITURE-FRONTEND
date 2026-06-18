"use client ";

import { useParams } from "next/navigation";
import { useState } from "react";
import Tab_Cust_Activity from "../customer_details_view/customer_details_components/Tab_Cust_Activity";
import Tab_Cust_Addresses from "../customer_details_view/customer_details_components/Tab_Cust_Addresses";
import Tab_Cust_Communications from "../customer_details_view/customer_details_components/Tab_Cust_Communications";
import Tab_Cust_Orders from "../customer_details_view/customer_details_components/Tab_Cust_Orders";
import Tab_Cust_Overview from "../customer_details_view/customer_details_components/Tab_Cust_Overview";
import Tab_Cust_Receipts from "../customer_details_view/customer_details_components/Tab_Cust_Receipts";
import Tab_Cust_Settings from "../customer_details_view/customer_details_components/Tab_Cust_Settings";
import { useCustomerDetail } from "./useCustomersQueries";

const useCustomerDetailView = () => {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("Overview");
  const [showEdit, setShowEdit] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const {
    data: customer,
    isLoading: singleCustomerLoading,
    isError: singleCustomerError,
  } = useCustomerDetail(id);

  const renderTab = () => {
    if (!customer) return null;
    switch (activeTab) {
      case "Overview":
        return <Tab_Cust_Overview customer={customer} />;
      case "Orders":
        return <Tab_Cust_Orders customer={customer} />;
      case "Addresses":
        return <Tab_Cust_Addresses customer={customer} />;
      case "Receipts":
        return <Tab_Cust_Receipts customerId={id} />;
      case "Activity":
        return <Tab_Cust_Activity customer={customer} />;
      // case "Communications":
      //   return <Tab_Cust_Communications customerId={id} />;
      // case "Settings":
      //   return <Tab_Cust_Settings customerId={id} />;
      default:
        return null;
    }
  };

  return {
    setActiveTab,
    showEdit,
    setShowEdit,
    setShowBlock,
    showBlock,
    showDelete,
    setShowDelete,
    showMsg,
    setShowMsg,
    singleCustomerLoading,
    singleCustomerError,
    renderTab,
    activeTab,
    customer,
    id,
  };
};

export default useCustomerDetailView;
