import App_Double_Text from "@/components/shared/App_Double_Text";
import App_Full_Text from "@/components/shared/App_Full_Text";
import { Truck } from "lucide-react";

const About_Why = () => {
  return (
    <section className="containerclass mb-20 grid gap-8">
      <App_Double_Text
        className="gap-y-1"
        header={{
          children: "Why Choose Litace",
          variant: "sectionTitle",
        }}
        para={{
          children: "Our commitment to quality and service sets us apart",
        }}
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((item, index) => (
          <App_Full_Text
            key={index}
            className="flex-col bg-white p-6 rounded-lg shadow-md items-start gap-y-4 group transition-all duration-500 hover:bg-surface-container border border-purple-50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.12)]"
            text={{
              className: "flex-col",
              header: {
                children: "New Arrivals",
                variant: "sectionTitle",
                className:
                  "tracking-tighter font-bold transition-colors duration-300 group-hover:text-primary",
              },
              para: {
                children:
                  "All our furniture is manufactured to the highest standards using premium materials and expert craftsmanship.",
                className:
                  "text-gray-500 text-base transition-colors duration-300 group-hover:text-gray-700",
              },
            }}
            extra={
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary transition-all duration-500">
                <Truck
                  size={30}
                  className="text-primary group-hover:text-white transition-all duration-500 transform group-hover:-scale-x-100 "
                />
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
};

export default About_Why;
