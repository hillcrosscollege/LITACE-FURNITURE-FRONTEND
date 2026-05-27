"use client";
import Single_Product_More_Info from "./Single_Product_More_Info";
import Single_Product_Add_Review from "./Single_Product_Add_Review";
import Single_Product from "../../products_components/Single_Product";
import App_Text from "@/components/app_ui/App_Text";
import Image from "next/image";
import App_Double_Text from "@/components/shared/App_Double_Text";
import Link from "next/link";

const Single_Product_Section_Two = () => {
  return (
    <section className="containerclass">
      <div className="flex justify-between gap-4 mb-20">
        <Single_Product_Add_Review />
        <div className="w-[30%] p-6 rounded-xl bg-white from-primary/20 via-secondary/10 to-transparent flex flex-col">
          <App_Text children="Similar Products" variant="sectionTitle" />
          <div className="flex-1 mt-6 justify-between flex-col flex gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex gap-4 mb-4 justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={"/conference_chair-2.png"}
                    alt={"name"}
                    width={400}
                    height={400}
                    className="w-20 h-20 object-cover group-hover:scale-105 transition-transform duration-700 bg-primary/20 rounded-lg"
                  />
                  <App_Double_Text
                    className="gap-y-0"
                    header={{
                      children: "Back Chair",
                      variant: "sectionSub",
                      className: "md:text-base",
                    }}
                    para={{
                      children: "$ 10000",
                      className: "text-sm lg:text-sm text-primary font-bold",
                    }}
                  />
                </div>
                <Link
                  href={"/products/1"}
                  className="text-primary font-bold hover:underline text-xs"
                >
                  View More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <App_Text children="Related Products" variant="sectionTitle" />
      <div className="flex gap-4 mb-10 mt-6">
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
