import App_Full_Text from "@/components/shared/App_Full_Text";

const Contact_Hero = () => {
  return (
    <section className="w-full bg-linear-to-b from-primary/20 via-secondary/10 to-transparent pt-16 lg:py-32">
      <App_Full_Text
        className="flex-col contenterclass"
        text={{
          className: "gap-y-4 text-center text-white",
          header: {
            children: "Contact Our Support",
            variant: "hero",
            className: "text-primary max-w-3xl mx-auto",
          },
          para: {
            children:
              "Supplier and manufacturer of quality furniture for churches, schools, offices, events, and hotels across South Africa and SADC countries.",
            className: "text-muted max-w-xl lg:text-lg mx-auto font-semibold",
          },
        }}
        extra={
          <div className="px-4 py-1 rounded-lg border-2 border-primary w-fit mx-auto uppercase tracking-widest text-primary font-bold text-sm">
            <p>Contact Us</p>
          </div>
        }
      />
    </section>
  );
};

export default Contact_Hero;
