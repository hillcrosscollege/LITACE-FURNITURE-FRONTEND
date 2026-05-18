import App_Text from "@/components/app_ui/App_Text";
import App_Full_Text from "@/components/shared/App_Full_Text";
import { Truck } from "lucide-react";

const About_Vision = () => {
  return (
    <section className="my-20 containerclass">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`h-2 w-2 rounded-full bg-secondary`}
            ></div>
          ))}
        </div>
        <App_Text
          children={"LITACE INTERIORS"}
          className="text-xs font-bold tracking-wider text-primary"
        />
      </div>
      <App_Text children="Our Vision" variant="heading" />

      <div className="flex flex-col md:flex-row gap-6 pt-8">
        <App_Full_Text
          className="flex-col flex-1 bg-navblue px-4 py-6 lg:p-20 rounded-lg shadow-md items-start gap-y-4 group transition-all duration-500  border border-purple-50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.12)] relative overflow-hidden"
          text={{
            className: "flex-col",
            header: {
              children: "Our Vision",
              variant: "sectionTitle",
              className: "tracking-tighter font-bold text-white",
            },
            para: {
              children:
                "To become the gold standard when furniture and decor supplies are the subject matter",
              className: "text-white text-base",
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
          className="flex-col flex-1 bg-white px-4 py-6 lg:p-20 rounded-lg shadow-md items-start gap-y-4 group transition-all duration-500 hover:bg-surface-container border border-purple-50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.12)] relative overflow-hidden"
          text={{
            className: "flex-col",
            header: {
              children: "Secret Sauce",
              variant: "sectionTitle",
              className:
                "tracking-tighter font-bold transition-colors duration-300 group-hover:text-primary",
            },
            para: {
              children:
                "Our secret sauce is not that much of a secret. It’s merely the power of imagination entwined with a passion for excellence. Truth be told… It requires style and grace.",
              className:
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
      </div>
    </section>
  );
};

export default About_Vision;
