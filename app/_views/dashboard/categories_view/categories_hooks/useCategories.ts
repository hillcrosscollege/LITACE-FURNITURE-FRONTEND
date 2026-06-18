import { useState } from "react";
import { useCategoriesQuery } from "./useCategoriesQueries";

const useCategories = () => {
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);

  const { data, isLoading, isError } = useCategoriesQuery();
  return { page, setPage, isLoading, isError, data, showAdd, setShowAdd };
};

export default useCategories;
