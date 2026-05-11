import App_Full_Text from "@/components/shared/App_Full_Text";

const About_Hero = () => {
  return (
    <section className="w-full bg-linear-to-b from-primary/20 via-secondary/10 to-transparent py-32">
      <App_Full_Text
        className="flex-col"
        text={{
          className: "gap-y-4 text-center text-primary",
          header: {
            children: "Excellence in Furniture",
            variant: "hero",
          },
          para: {
            children:
              "Supplier and manufacturer of quality furniture for churches, schools, offices, events, and hotels across South Africa and SADC countries.",
            className: "text-muted max-w-xl lg:text-lg mx-auto",
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
