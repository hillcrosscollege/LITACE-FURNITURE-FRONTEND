"use client";

import App_Paginate from "@/components/app_ui/App_Paginate";
import Products_Hero from "./products_components/Products_Hero";
import Single_Product from "./products_components/Single_Product";
import { useEffect, useState } from "react";
import Product_Filter from "./products_components/Product_Filter";
import Mobile_Product_Filter from "./products_components/Mobile_Product_Filter";
import { categories, productsData } from "@/app/tmp/popularProducts";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

const Product_View = () => {
  const { register, watch } = useForm<{ Search: string }>();
  const [page, setPage] = useState(1);

  const searchValue = watch("Search") || "";
  // const [filters, setFilters] = useState({
  //   categories: [] as string[],
  //   priceRange: [0, 1000],
  // });

  const [filters, setFilters] = useState({
    category: "All",
    priceRange: [0, 1000],
  });

  // const filteredProducts = productsData.filter((p) => {
  //   const matchPrice =
  //     p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];

  //   const matchCategory =
  //     filters.categories.length === 0 ||
  //     filters.categories.includes(p.category);

  //   return matchPrice && matchCategory;
  // });

  const filteredProducts = productsData.filter((p) => {
    const matchPrice =
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];

    const matchCategory =
      filters.category === "All" || p.category === filters.category;

    const matchSearch = p.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    return matchPrice && matchCategory && matchSearch;
  });

  const itemsPerPage = 12;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const currentProducts = filteredProducts.slice(start, end);
  const showingStart = start + 1;
  const showingEnd = Math.min(end, filteredProducts.length);

  // const toggleCategory = (category: string) => {
  //   setPage(1);

  //   setFilters((prev) => ({
  //     ...prev,
  //     categories: prev.categories.includes(category)
  //       ? prev.categories.filter((c) => c !== category)
  //       : [...prev.categories, category],
  //   }));
  // };

  useEffect(() => {
    setPage(1);
  }, [searchValue, filters.category]);

  return (
    <>
      <Products_Hero />

      <section className="containerclass lg;my-20">
        <div className="flex flex-col gap-8">
          {/* <Product_Filter
            style="hidden lg:block"
            setPage={setPage}
            setFilters={setFilters}
          /> */}
          {/* <div className="flex gap-4 mx-auto">
            {categories.map((item) => (
              <App_Button
                text={item.name}
                btnStyle="bg-white text-gray-700 hover:bg-gray-200 rounded-full px-4 py-2"
              />
            ))}
          </div> */}
          {/* <div className="flex gap-4 mx-auto flex-wrap justify-center">
            {categories.map((item) => {
              const active = filters.categories.includes(item.name);

              return (
                <App_Button
                  key={item.name}
                  text={item.name}
                  onPress={() => toggleCategory(item.name)}
                  btnStyle={`rounded-full px-5 py-2 transition-all duration-300
          ${
            active
              ? "bg-primary text-white shadow-lg scale-105"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }
        `}
                />
              );
            })}
          </div> */}

          <div className="flex flex-col lg:flex-row justify-between items-center w-full">
            <App_Input
              containerStyle="w-full max-w-sm"
              showLabel={false}
              icon1={<Search size={15} className="text-primary" />}
              name="Search"
              placeholder="Search products..."
              register={register}
              // rules={{
              //   required: "Password is required",
              // }}
            />

            <div className="flex gap-2 w-full mt-4 lg:mt-0 lg:gap-4  lg:justify-end overflow-x-auto">
              <App_Button
                text="All"
                onPress={() => {
                  setPage(1);

                  setFilters((prev) => ({
                    ...prev,
                    category: "All",
                  }));
                }}
                btnStyle={`rounded-full px-5 py-2 transition-all duration-300
      ${
        filters.category === "All"
          ? "bg-primary text-white shadow-lg scale-105"
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
      }
    `}
              />

              {categories.map((item) => {
                const active = filters.category === item.name;

                return (
                  <App_Button
                    key={item.name}
                    text={item.name}
                    onPress={() => {
                      setPage(1);

                      setFilters((prev) => ({
                        ...prev,
                        category: item.name,
                      }));
                    }}
                    btnStyle={`rounded-full px-5 py-2 transition-all duration-300
          ${
            active
              ? "bg-primary text-white shadow-lg scale-105"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }
        `}
                  />
                );
              })}
            </div>
          </div>

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
