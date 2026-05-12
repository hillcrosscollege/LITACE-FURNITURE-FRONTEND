import App_Full_Text from "@/components/shared/App_Full_Text";

const Contact_Hero = () => {
  return (
    <section className="w-full bg-linear-to-br from-lightPrimary to-primary py-32">
      <App_Full_Text
        className="flex-col"
        text={{
          className: "gap-y-4 text-center text-white",
          header: {
            children: "Contact Our Support",
            variant: "cardTitle",
            className: "max-w-3xl mx-auto",
          },
          para: {
            children:
              "Supplier and manufacturer of quality furniture for churches, schools, offices, events, and hotels across South Africa and SADC countries.",
            className: "text-white max-w-xl mx-auto text-base md:text-lg",
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
