"use client";
import Single_Product from "../../products_components/Single_Product";
import App_Text from "@/components/app_ui/App_Text";
import Single_Product_Reviews from "./Single_Product_Review";

const Single_Product_Section_Two = () => {
  return (
    <section className="containerclass">
      <Single_Product_Reviews />

      <App_Text children="Related Products" variant="heading" />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-10 mt-6">
        {[1, 2, 3, 4].map((item) => (
          <Single_Product
            key={item}
            category="Category"
            description="some product"
            id="1"
            image="/conference_chair-2.png"
            name="Back Chair"
            price={10000}
          />
        ))}
      </div>
    </section>
  );
};

export default Single_Product_Section_Two;
