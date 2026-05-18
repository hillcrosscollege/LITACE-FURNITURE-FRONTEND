import Image from "next/image";
import App_Full_Text from "@/components/shared/App_Full_Text";
import { categories } from "@/app/tmp/popularProducts";
import App_Text from "@/components/app_ui/App_Text";

const Home_Category = () => {
  return (
    <section className="containerclass py-12 grid gap-8">
      <App_Full_Text
        className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0"
        text={{
          className: "flex-col",
          header: {
            children: "Categories",
            variant: "heading",
            className: "tracking-tighter",
          },
          para: {
            children:
              "Choose your favorite category and find a furniture collection that suits your style and needs.",
            className: "max-w-md text-accent text-base text-muted",
          },
        }}
        btn={{
          text: "View All",
          onPress: () => {},
          btnStyle:
            "bg-primary text-white px-8 py-5 rounded-full hover:bg-primary/90 transition-colors text-lg font-semibold",
        }}
      />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {categories.map((category, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative aspect-square rounded-xl overflow-hidden mb-6 border border-purple-50 bg-white shadow-sm transition-all duration-500 group-hover:shadow-lg group-hover:border-primary/70 group-hover:-translate-y-1">
              <Image
                src={category.image}
                alt="Category Image"
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-primary/50 via-black/15 to-transparent" />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 text-white">
                <App_Text
                  children={category.name}
                  className="font-semibold text-lg drop-shadow text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home_Category;
