import App_Full_Text from "@/components/shared/App_Full_Text";
import { features } from "../home_data";

const Home_Hero_Card = () => {
  return (
    <section className="  py-12 bg-primary/10">
      <div className="flex flex-wrap md:flex-nowrap gap-y-10 justify-between containerclass">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <App_Full_Text
              key={index}
              containerStyle="items-center gap-x-2 md:gap-x-4 items-center w-[48%] md:w-auto"
              text={{
                textContentStyle: "gap-y-1",
                header: {
                  text: item.title,
                  type: "mini",
                  style: "uppercase tracking-widest",
                },
                para: {
                  text: item.subtitle,
                  style: "text-[10px]",
                },
              }}
              extra={<Icon size={20} className="text-primary" />}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Home_Hero_Card;
