import { useState } from "react";
import { useCategoriesQuery } from "./useCategoriesQueries";

const useCategories = () => {
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);

  const { data, isLoading, isError } = useCategoriesQuery();

  const categoryListStats = data?.stats
    ? [
        {
          title: "Total Categories",
          value: String(data.stats.total),
          iconClassName: "text-[#7048b6]",
          iconWrapperClassName: "bg-[#f0ebf7]",
        },
        {
          title: "Active Categories",
          value: String(data.stats.active),
          iconClassName: "text-[#2e7d52]",
          iconWrapperClassName: "bg-[#edf7f2]",
        },
        {
          title: "Inactive Categories",
          value: String(data.stats.inactive),
          iconClassName: "text-[#2e7d52]",
          iconWrapperClassName: "bg-[#edf7f2]",
        },
      ]
    : [];

  return {
    page,
    setPage,
    isLoading,
    isError,
    data,
    showAdd,
    setShowAdd,
    categoryListStats,
  };
};

export default useCategories;
