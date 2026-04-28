import App_Double_Text from "@/components/shared/App_Double_Text";

const About_Last = () => {
  return (
    <section className="w-full bg-linear-to-br from-primary via-primary to-lightPrimary py-20">
      <div className="containerclass grid gap-12">
        <App_Double_Text
          textContentStyle="gap-y-4 text-center text-white"
          header={{
            text: "Regional Coverage",
            type: "subhead",
          }}
          para={{
            text: "Serving clients across South Africa and SADC countries with reliable delivery and quality service",
            style: "text-white max-w-md mx-auto text-base md:text-lg",
          }}
        />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <div
              key={index}
              className="bg-white border-2 border-primary/30 py-6 rounded-sm"
            >
              <p className="text-primary text-center">Furnitures and more</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About_Last;
