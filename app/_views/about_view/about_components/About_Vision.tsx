import App_Full_Text from "@/components/shared/App_Full_Text";
import { Truck } from "lucide-react";

const About_Vision = () => {
  return (
    <section className="my-20 containerclass flex flex-col md:flex-row gap-6">
      <App_Full_Text
        containerStyle="flex-col bg-primary p-20 rounded-lg shadow-md items-start gap-y-4 group transition-all duration-500  border border-purple-50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.12)] relative overflow-hidden"
        text={{
          textContentStyle: "flex-col",
          header: {
            text: "New Arrivals",
            type: "cardhead",
            style: "tracking-tighter font-bold text-white",
          },
          para: {
            text: "All our furniture is manufactured to the highest standards using premium materials and expert craftsmanship.",
            style: "text-white text-base",
          },
        }}
        extra={
          <>
            <div className="bg-white/20 z-10 rounded-full absolute h-24 w-24 -top-4 -right-6"></div>
            <div className="p-3 rounded-lg bg-white">
              <Truck
                size={30}
                className="text-primary transition-all duration-500 transform group-hover:-scale-x-100 "
              />
            </div>
          </>
        }
      />
      <App_Full_Text
        containerStyle="flex-col bg-white p-20 rounded-lg shadow-md items-start gap-y-4 group transition-all duration-500 hover:bg-surface-container border border-purple-50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.12)] relative overflow-hidden"
        text={{
          textContentStyle: "flex-col",
          header: {
            text: "New Arrivals",
            type: "cardhead",
            style:
              "tracking-tighter font-bold transition-colors duration-300 group-hover:text-primary",
          },
          para: {
            text: "All our furniture is manufactured to the highest standards using premium materials and expert craftsmanship.",
            style:
              "text-gray-500 text-base transition-colors duration-300 group-hover:text-gray-700",
          },
        }}
        extra={
          <>
            <div className="bg-primary z-10 rounded-full absolute h-24 w-24 -top-4 -right-6"></div>
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary transition-all duration-500">
              <Truck
                size={30}
                className="text-primary group-hover:text-white transition-all duration-500 transform group-hover:-scale-x-100 "
              />
            </div>
          </>
        }
      />
    </section>
  );
};

export default About_Vision;
