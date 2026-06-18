"use client";
import { useState } from "react";
import { categoryDetail } from "../categories_data/categories_data";
import Tab_Cat_Activity from "../category_detail_view/category_detail_component/Tab_Cat_Activity";
import Tab_Cat_Overview from "../category_detail_view/category_detail_component/Tab_Cat_Overview";
import Tab_Cat_Products from "../category_detail_view/category_detail_component/Tab_Cat_Products";
import Tab_Cat_Subcategories from "../category_detail_view/category_detail_component/Tab_Cat_Subcategories";

const useCategoriesDetails = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const {
    name,
    image,
    description,
    status,
    products,
    subcategories,
    sortOrder,
    createdAt,
  } = categoryDetail;

  const renderTab = () => {
    switch (activeTab) {
      case "Overview":
        return <Tab_Cat_Overview />;
      case "Products":
        return <Tab_Cat_Products />;
      case "Subcategories":
        return <Tab_Cat_Subcategories />;
      case "Activity":
        return <Tab_Cat_Activity />;
      default:
        return null;
    }
  };

  return {
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
  };
};
export default useCategoriesDetails;
