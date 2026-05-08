"use client";

import App_Paginate from "@/components/app_ui/App_Paginate";
import Products_Hero from "./products_components/Products_Hero";
import Single_Product from "./products_components/Single_Product";
import { useState } from "react";
import Product_Filter from "./products_components/Product_Filter";
import Mobile_Product_Filter from "./products_components/Mobile_Product_Filter";
import { productsData } from "@/app/tmp/popularProducts";

const Product_View = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 1000],
  });

  const filteredProducts = productsData.filter((p) => {
    const matchPrice =
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];

    const matchCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(p.category);

    return matchPrice && matchCategory;
  });

  const itemsPerPage = 12;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const currentProducts = filteredProducts.slice(start, end);
  const showingStart = start + 1;
  const showingEnd = Math.min(end, filteredProducts.length);

  return (
    <>
      <Products_Hero />

      <section className="containerclass my-20">
        <div className="flex gap-8">
          <Product_Filter
            style="hidden lg:block"
            setPage={setPage}
            setFilters={setFilters}
          />

          <div className="flex-1">
            <div className="p-4 bg-white mb-6 flex items-center gap-6">
              {/* <Mobile_Product_Filter /> */}
              <p>
                Showing {showingStart}-{showingEnd} of {filteredProducts.length}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((item) => (
                <Single_Product key={item.id} {...item} />
              ))}
            </div>
            <App_Paginate
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              paginateStyle="bg-white w-full py-4 mt-6"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Product_View;
