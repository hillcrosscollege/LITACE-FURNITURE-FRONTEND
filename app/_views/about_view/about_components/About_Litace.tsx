import App_Header_Text from "@/components/app_ui/App_Text";
import App_Paragraph from "@/components/app_ui/App_Paragraph";
import Image from "next/image";
import App_Text from "@/components/app_ui/App_Text";

const About_Litace = () => {
  const whowearedata = [
    "We are a supplier and manufacturer of quality furniture for churches, schools, offices, events and hotels. We are strategically based in the industrial area of Sebenza in Edenvale, Johannesburg.",
    "This is part of what gives us an unfair advantage in the logistical footprint of South Africa and SADC countries such as Botswana, Namibia, Zambia, Zimbabwe, Mozambique, Lesotho, Swaziland, Malawi, etc.",
  ];

  const furnitureCategories = [
    "Church and Conference Chairs",
    "Office Chairs",
    "School Desks and Chairs",
    "Wedding, Funeral and Events Chairs",
    "Office Desks and Tables",
    "Pulpits and Podiums",
    "Antique and French Styled Chairs",
  ];
  return (
    <section className="containerclass mt-20 flex flex-col lg:flex-row gap-12 justify-between">
      <aside className="lg:w-[50%] xl:w-[45%] flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`h-2 w-2 rounded-full bg-secondary`}
              ></div>
            ))}
          </div>
          <App_Text
            children={"LITACE INTERIORS"}
            className="text-xs font-bold tracking-wider text-primary"
          />
        </div>
        <App_Text children="Who Are We" variant="heading" />
        {[
          whowearedata.map((item, index) => (
            <App_Text children={item} key={index} />
          )),
        ]}
        <div className="grid md:grid-cols-2 gap-4 mt-4 md:mt-6">
          {furnitureCategories.map((item, index) => (
            <div
              className="border-x-2 border-primary pl-4 rounded-sm py-1 md:py-3 bg-white"
              key={index}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      </aside>
      <div className="lg:w-[50%] xl:w-[45%] relative flex justify-items-end">
        <div className="w-[70%] h-[90%] z-[-1] bg-secondary/50 absolute top-0 right-0 rounded-t-xl rounded-br-xl"></div>
        <Image
          src={"/conference_chair-2.png"}
          alt="About-litace-image"
          width={400}
          height={400}
          className="md:h-[90%] w-[90%] rounded-xl mt-8 lg:mt-auto bg-white border border-primary from-primary/20 via-secondary/10 to-transparent"
        />
      </div>
    </section>
  );
};

export default About_Litace;
