import Image from "next/image";
import { products } from "../home_data";
import App_Full_Text from "@/components/shared/App_Full_Text";

const Home_Category = () => {
  return (
    <section className="containerclass py-12 grid gap-8">
      <App_Full_Text
        containerStyle="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0"
        text={{
          textContentStyle: "flex-col",
          header: {
            text: "Categories",
            type: "subhead",
            style: "tracking-tighter",
          },
          para: {
            text: "Choose your favorite category and find a furniture collection that suits your style and needs.",
            style: "max-w-md italic",
          },
        }}
        btn={{
          text: "View All",
          onPress: () => {},
          btnStyle:
            "bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm",
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div key={index}>
            <div className="aspect-square bg-white rounded-xl overflow-hidden mb-6 border border-purple-50">
              <Image
                src={
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCwduLZd_XqDq3CPIxMl1X7MotMkVuW_oI24rzX1972f9k2aLnT65ko8h8l5BwjJgn9g5H3F60d1hPmmqOlXrF_jEFu59I3tO0XhdqeBVZEDOFtVKn4q4pXrf5Oz_NPQN6snF-yrlurUy0h_kH64N4CbPo53bDRYvd81ZMJGkeHDsuaDLaxd6LNtqUshkC87o8e2rLfvjWVsyhlrTqrk58avmrzePkampMqSE0xFkh9LKvr43F_cnvwTBuAOWakTDB8gNr29It8O2g"
                }
                alt={"Category Image"}
                width={40}
                height={40}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-headline font-bold text-lg">Category</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home_Category;
