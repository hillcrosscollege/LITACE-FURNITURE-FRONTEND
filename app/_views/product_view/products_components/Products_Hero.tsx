import App_Full_Text from "@/components/shared/App_Full_Text";

const Products_Hero = () => {
  return (
    <section className="w-full bg-linear-to-br from-lightPrimary to-primary py-20">
      <App_Full_Text
        containerStyle="flex-col"
        text={{
          textContentStyle: "gap-y-4 text-center text-white",
          header: {
            text: "Litace Products",
            type: "title",
            style: "max-w-3xl mx-auto",
          },
        }}
        extra={
          <div className="px-4 py-1 rounded-lg border-2 border-primary w-fit mx-auto uppercase tracking-widest text-primary font-bold text-sm">
            <p>Our Products</p>
          </div>
        }
      />
    </section>
  );
};

export default Products_Hero;
