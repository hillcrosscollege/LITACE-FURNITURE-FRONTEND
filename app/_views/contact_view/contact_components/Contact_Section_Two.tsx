import Contact_Form from "./Contact_Form";
import App_Double_Text from "@/components/shared/App_Double_Text";
import App_Full_Text from "@/components/shared/App_Full_Text";

const Contact_Section_Two = () => {
  return (
    <section className="containerclass my-20 flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between">
      <div className="lg:w-[50%] flex flex-col gap-y-10">
        <App_Double_Text
          className="gap-y-4"
          header={{
            children: "Get More Information",
            variant: "cardTitle",
          }}
          para={{
            children:
              "Serving clients across South Africa and SADC countries with reliable delivery and quality service",
            className: "max-w-md text-base md:text-lg",
          }}
        />
        <div className="grid gap-4 grid-cols-2 ">
          {[1, 2, 3, 4].map((item, index) => (
            <App_Full_Text
              key={index}
              className="flex-col bg-white p-3 lg:p-6 rounded-lg shadow-md items-start gap-y-4 group transition-all duration-500 hover:bg-surface-container border border-purple-50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.12)]"
              text={{
                className: "flex-col",
                header: {
                  children: "Contact",
                  variant: "cardTitle",
                  className:
                    "tracking-tighter font-bold transition-colors duration-300 group-hover:text-primary",
                },
                para: {
                  children:
                    "All our furniture is manufactured to the highest standards.",
                  className:
                    "text-gray-500 text-sm md:text-base transition-colors duration-300 group-hover:text-gray-700",
                },
              }}
            />
          ))}
        </div>
      </div>
      <Contact_Form />
    </section>
  );
};

export default Contact_Section_Two;
