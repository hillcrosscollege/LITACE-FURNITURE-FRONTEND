import Image from "next/image";
import App_Full_Text from "@/components/shared/App_Full_Text";
import { categories } from "@/app/tmp/popularProducts";

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
            className: "max-w-md italic",
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
        {categories.map((category, index) => (
          <div key={index}>
            <div className="aspect-square bg-white rounded-xl overflow-hidden mb-6 border border-purple-50">
              <Image
                src={category.image}
                alt={"Category Image"}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-headline font-bold text-lg">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home_Category;
