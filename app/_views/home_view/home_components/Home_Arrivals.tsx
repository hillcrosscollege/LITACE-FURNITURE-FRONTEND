import App_Full_Text from "@/components/shared/App_Full_Text";
import Home_Product_Card from "./Home_Product_Card";
import { newArrivals } from "@/app/tmp/popularProducts";

const Home_Arrivals = () => {
  return (
    <section className="containerclass py-12 grid gap-8">
      <App_Full_Text
        className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0"
        text={{
          className: "flex-col",
          header: {
            children: "New Arrivals",
            variant: "heading",
            className: "tracking-tighter",
          },
          para: {
            children: "Latest additions to our collection",
            className: "max-w-md font-accent text-muted",
          },
        }}
        btn={{
          text: "View All",
          onPress: () => {},
          btnStyle:
            "bg-primary text-white px-8 py-5 rounded-full hover:bg-primary/90 transition-colors text-lg font-semibold",
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {newArrivals.map((product, index) => (
          <Home_Product_Card {...product} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Home_Arrivals;
