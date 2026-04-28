"use client";
import App_Grouped from "@/components/shared/App_Grouped";
import Home_Hero_Image_Card from "./Home_Hero_Image_Card";
import { useEffect, useState } from "react";
import { Hero } from "@/assets/img";

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
    <section className="w-full bg-linear-to-br from-lightPrimary to-primary py-12">
      <App_Grouped
        groupStyle="containerclass flex flex-col lg:flex-row gap-16 lg:gap-0 justify-between items-center"
        full_text={{
          containerStyle: "lg:w-[55%]",
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
        img={{
          imgContainerStyle: "lg:w-[40%] relative h-[300px] lg:h-[600px]",
          alt: "Product images",
          // src: images[img],
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwduLZd_XqDq3CPIxMl1X7MotMkVuW_oI24rzX1972f9k2aLnT65ko8h8l5BwjJgn9g5H3F60d1hPmmqOlXrF_jEFu59I3tO0XhdqeBVZEDOFtVKn4q4pXrf5Oz_NPQN6snF-yrlurUy0h_kH64N4CbPo53bDRYvd81ZMJGkeHDsuaDLaxd6LNtqUshkC87o8e2rLfvjWVsyhlrTqrk58avmrzePkampMqSE0xFkh9LKvr43F_cnvwTBuAOWakTDB8gNr29It8O2g",
          style: `
            w-full h-full object-cover rounded-[40px]
            asymmetric-shadow border-8 border-white
            transition-opacity duration-700
            `,
          // ${fade ? "opacity-100" : "opacity-0"}
          extra: <Home_Hero_Image_Card />,
        }}
      />
    </section>
  );
};

export default Home_Hero;

// src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwduLZd_XqDq3CPIxMl1X7MotMkVuW_oI24rzX1972f9k2aLnT65ko8h8l5BwjJgn9g5H3F60d1hPmmqOlXrF_jEFu59I3tO0XhdqeBVZEDOFtVKn4q4pXrf5Oz_NPQN6snF-yrlurUy0h_kH64N4CbPo53bDRYvd81ZMJGkeHDsuaDLaxd6LNtqUshkC87o8e2rLfvjWVsyhlrTqrk58avmrzePkampMqSE0xFkh9LKvr43F_cnvwTBuAOWakTDB8gNr29It8O2g",
