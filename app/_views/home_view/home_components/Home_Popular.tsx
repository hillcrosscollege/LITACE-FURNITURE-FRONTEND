import App_Paragraph from "@/components/app_ui/App_Paragraph";
import Home_Product_Card from "./Home_Product_Card";
import App_Full_Text from "@/components/shared/App_Full_Text";
import { popularProducts } from "@/app/tmp/popularProducts";
import App_Text from "@/components/app_ui/App_Text";

const Home_Popular = () => {
  return (
    <section className="containerclass md:py-12 grid gap-8">
      <App_Full_Text
        className="flex flex-col md:flex-row-reverse justify-between md:items-center gap-4 md:gap-0"
        text={{
          className: "flex-col-reverse gap-y-1",
          header: {
            children: "Popular Products",
            variant: "heading",
            className: "tracking-tighter",
          },
          para: {
            children: "curated",
            className:
              "text-xs uppercase tracking-[0.2em] text-primary font-bold",
          },
        }}
        extra={
          <App_Text
            children="Discover the pieces that define modern South African workspaces and educational hubs."
            className="max-w-sm text-base"
          />
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {popularProducts.map((product, index) => (
          <Home_Product_Card {...product} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Home_Popular;
