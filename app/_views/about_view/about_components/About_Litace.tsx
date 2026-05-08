import App_Header_Text from "@/components/app_ui/App_Header_Text";
import App_Paragraph from "@/components/app_ui/App_Paragraph";
import Image from "next/image";

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
        <App_Header_Text text="Who Are We" type="subhead" />
        {[
          whowearedata.map((item, index) => (
            <App_Paragraph text={item} key={index} />
          )),
        ]}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {furnitureCategories.map((item, index) => (
            <div
              className="border-l-2 border-primary pl-4 rounded-sm py-3 bg-white"
              key={index}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      </aside>
      <div className="lg:w-[50%] xl:w-[45%] relative flex justify-items-end">
        <div className="w-[70%] h-[90%] z-[-1] bg-primary/50 absolute top-0 right-0 rounded-t-xl rounded-br-xl"></div>
        <Image
          src={
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCwduLZd_XqDq3CPIxMl1X7MotMkVuW_oI24rzX1972f9k2aLnT65ko8h8l5BwjJgn9g5H3F60d1hPmmqOlXrF_jEFu59I3tO0XhdqeBVZEDOFtVKn4q4pXrf5Oz_NPQN6snF-yrlurUy0h_kH64N4CbPo53bDRYvd81ZMJGkeHDsuaDLaxd6LNtqUshkC87o8e2rLfvjWVsyhlrTqrk58avmrzePkampMqSE0xFkh9LKvr43F_cnvwTBuAOWakTDB8gNr29It8O2g"
          }
          alt="About-litace-image"
          width={400}
          height={400}
          className="md:h-[90%] w-[90%] rounded-xl mt-8 lg:mt-auto"
        />
      </div>
    </section>
  );
};

export default About_Litace;
