import { products } from "../home_data";
import App_Paragraph from "@/components/app_ui/App_Paragraph";
import Home_Product_Card from "./Home_Product_Card";
import App_Full_Text from "@/components/shared/App_Full_Text";

const Home_Popular = () => {
  return (
    <section className="containerclass py-12 grid gap-8">
      <App_Full_Text
        containerStyle="flex flex-col md:flex-row-reverse justify-between md:items-center gap-4 md:gap-0"
        text={{
          textContentStyle: "flex-col-reverse gap-y-1",
          header: {
            text: "Popular Products",
            type: "subhead",
            style: "tracking-tighter",
          },
          para: {
            text: "curated",
            style: "text-xs uppercase tracking-[0.2em] text-primary font-bold",
          },
        }}
        extra={
          <App_Paragraph
            text="Discover the pieces that define modern South African workspaces and educational hubs."
            style="max-w-sm text-base md:text-lg"
          />
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...products, ...products].map((product, index) => (
          <Home_Product_Card {...product} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Home_Popular;
