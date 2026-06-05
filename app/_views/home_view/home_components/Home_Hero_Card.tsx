import App_Full_Text from "@/components/shared/App_Full_Text";
import { features } from "../home_data";

const Home_Hero_Card = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="flex flex-wrap md:flex-nowrap gap-y-8 md:gap-y-10 justify-between containerclass">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <App_Full_Text
              key={index}
              className="gap-x-2 md:gap-x-4 items-center w-[48%] md:w-auto font-semibold"
              text={{
                className: "gap-y-1",
                header: {
                  children: item.title,
                  variant: "cardTitle",
                  className:
                    "uppercase tracking-widest text-white text-[11px] md:text-sm lg:text-lg",
                },
                para: {
                  children: item.subtitle,
                  className: "text-[11px] md:text-sm text-white",
                },
              }}
              extra={<Icon size={18} className="text-white" />}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Home_Hero_Card;
