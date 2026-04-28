import App_Full_Text from "@/components/shared/App_Full_Text";
import { products } from "../home_data";
import Home_Product_Card from "./Home_Product_Card";

const Home_Arrivals = () => {
  return (
    <section className="containerclass py-12 grid gap-8">
      <App_Full_Text
        containerStyle="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0"
        text={{
          textContentStyle: "flex-col",
          header: {
            text: "New Arrivals",
            type: "subhead",
            style: "tracking-tighter",
          },
          para: {
            text: "Latest additions to our collection",
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
          <Home_Product_Card {...product} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Home_Arrivals;
