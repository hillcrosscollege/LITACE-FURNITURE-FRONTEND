"use client";
import App_Grouped from "@/components/shared/App_Grouped";
import Home_Hero_Image_Card from "./Home_Hero_Image_Card";
import { useEffect, useState } from "react";
import { Hero } from "@/assets/img";
import App_Slider from "@/components/app_ui/App_Slider";
import App_Full_Text from "@/components/shared/App_Full_Text";

const Home_Hero = () => {
  const [img, setImg] = useState(0);
  // const [fade, setFade] = useState(true);
  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCwduLZd_XqDq3CPIxMl1X7MotMkVuW_oI24rzX1972f9k2aLnT65ko8h8l5BwjJgn9g5H3F60d1hPmmqOlXrF_jEFu59I3tO0XhdqeBVZEDOFtVKn4q4pXrf5Oz_NPQN6snF-yrlurUy0h_kH64N4CbPo53bDRYvd81ZMJGkeHDsuaDLaxd6LNtqUshkC87o8e2rLfvjWVsyhlrTqrk58avmrzePkampMqSE0xFkh9LKvr43F_cnvwTBuAOWakTDB8gNr29It8O2g",
    Hero.src,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // setFade(false);

      setTimeout(() => {
        setImg((prev) => (prev + 1) % images.length);
        // setFade(true);
      }, 400);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    // <section className="w-full py-24 h-full relative overflow-x-clip">
    <section className="w-full bg-linear-to-br from-lightPrimary to-primary py-24 relative overflow-x-clip">
      <div
        className="
      absolute -top-24 -left-24
      w-[28rem] h-[28rem]
      rounded-full
      bg-purple-400/30
      blur-3xl
      pointer-events-none
    "
      />

      <div
        className="
      absolute top-[20%] right-[-8rem]
      w-[24rem] h-[24rem]
      rounded-full
      bg-pink-300/20
      blur-3xl
      pointer-events-none
    "
      />

      <div
        className="
      absolute bottom-[-10rem] left-[35%]
      w-[22rem] h-[22rem]
      rounded-full
      bg-blue-300/20
      blur-3xl
      pointer-events-none
    "
      />
      <App_Full_Text
        containerStyle="containerclass flex flex-col-reverse lg:flex-row-reverse gap-16 lg:gap-0 justify-between items-center"
        text={{
          textContentStyle: "lg:w-[50%]",

          header: {
            text: "The Gold Standard for",
            type: "title",
            extra: (
              <>
                <span className="text-primary font-normal font-accent italic">
                  Home, School, Office{" "}
                </span>
                <span>&amp; Church</span>
              </>
            ),
          },
          para: {
            text: "Premier manufacturer and supplier across the SADC region. Elevating communal spaces through artisanal precision.",
          },
        }}
        extra={
          <div className="lg:w-[40%] lg:h-[500px] w-[50%]">
            <App_Slider
              images={[
                "/tmp/images/diamond_black_1.jpg",
                "/tmp/images/Full_Back_Conference_Chair_blue_1.jpg",
                "/tmp/images/Marval_Chair_blue_1.png",
                "/tmp/images/single_combination_primary.jpg",
              ]}
              imgContainerStyle="flex-[0_0_100%]"
              loop={true}
            />
          </div>
        }
        // img={{
        //   imgContainerStyle: "lg:w-[40%] relative h-[300px] lg:h-[600px]",
        //   alt: "Product images",
        //   // src: images[img],
        //   src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwduLZd_XqDq3CPIxMl1X7MotMkVuW_oI24rzX1972f9k2aLnT65ko8h8l5BwjJgn9g5H3F60d1hPmmqOlXrF_jEFu59I3tO0XhdqeBVZEDOFtVKn4q4pXrf5Oz_NPQN6snF-yrlurUy0h_kH64N4CbPo53bDRYvd81ZMJGkeHDsuaDLaxd6LNtqUshkC87o8e2rLfvjWVsyhlrTqrk58avmrzePkampMqSE0xFkh9LKvr43F_cnvwTBuAOWakTDB8gNr29It8O2g",
        //   style: `
        //     w-full h-full object-cover rounded-[40px]
        //     asymmetric-shadow border-8 border-white
        //     transition-opacity duration-700
        //     `,
        //   // ${fade ? "opacity-100" : "opacity-0"}
        //   extra: <Home_Hero_Image_Card />,
        // }}
      />
      {/* <App_Grouped
        groupStyle="containerclass flex flex-col lg:flex-row gap-16 lg:gap-0 justify-between items-center"
        full_text={{
          containerStyle: "lg:w-[50%]",
          text: {
            header: {
              text: "The Gold Standard for",
              type: "title",
              extra: (
                <>
                  <span className="text-primary font-normal font-accent italic">
                    Home, School, Office{" "}
                  </span>
                  <span>&amp; Church</span>
                </>
              ),
            },
            para: {
              text: "Premier manufacturer and supplier across the SADC region. Elevating communal spaces through artisanal precision.",
            },
          },
        }}
        // img={{
        //   imgContainerStyle: "lg:w-[40%] relative h-[300px] lg:h-[600px]",
        //   alt: "Product images",
        //   // src: images[img],
        //   src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwduLZd_XqDq3CPIxMl1X7MotMkVuW_oI24rzX1972f9k2aLnT65ko8h8l5BwjJgn9g5H3F60d1hPmmqOlXrF_jEFu59I3tO0XhdqeBVZEDOFtVKn4q4pXrf5Oz_NPQN6snF-yrlurUy0h_kH64N4CbPo53bDRYvd81ZMJGkeHDsuaDLaxd6LNtqUshkC87o8e2rLfvjWVsyhlrTqrk58avmrzePkampMqSE0xFkh9LKvr43F_cnvwTBuAOWakTDB8gNr29It8O2g",
        //   style: `
        //     w-full h-full object-cover rounded-[40px]
        //     asymmetric-shadow border-8 border-white
        //     transition-opacity duration-700
        //     `,
        //   // ${fade ? "opacity-100" : "opacity-0"}
        //   extra: <Home_Hero_Image_Card />,
        // }}
      /> */}
    </section>
  );
};

export default Home_Hero;
