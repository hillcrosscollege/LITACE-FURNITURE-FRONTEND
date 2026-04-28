import App_Full_Text from "@/components/shared/App_Full_Text";

const About_Hero = () => {
  return (
    <section className="w-full bg-linear-to-br from-lightPrimary to-primary py-32">
      <App_Full_Text
        containerStyle="flex-col"
        text={{
          textContentStyle: "gap-y-4 text-center text-white",
          header: {
            text: "Excellence in Furniture",
            type: "title",
          },
          para: {
            text: "Supplier and manufacturer of quality furniture for churches, schools, offices, events, and hotels across South Africa and SADC countries.",
            style: "text-white max-w-xl mx-auto text-base md:text-lg",
          },
        }}
        extra={
          <div className="px-4 py-1 rounded-lg border-2 border-primary w-fit mx-auto uppercase tracking-widest text-primary font-bold text-sm">
            <p>About Us</p>
          </div>
        }
      />
    </section>
  );
};

export default About_Hero;
