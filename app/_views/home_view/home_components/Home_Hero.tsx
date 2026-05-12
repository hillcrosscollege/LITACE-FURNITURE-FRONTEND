"use client";
import Home_Hero_Image_Card from "./Home_Hero_Image_Card";
import App_Slider from "@/components/app_ui/App_Slider";
import App_Text from "@/components/app_ui/App_Text";
import App_Full_Text from "@/components/shared/App_Full_Text";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const Home_Hero = () => {
  const heroTexts = ["Home", "School", "Office", "Church"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-24 h-full relative overflow-x-clip">
      {/* // <section className="w-full bg-linear-to-br from-lightPrimary to-primary py-24 relative overflow-x-clip"> */}
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

      {/* <div
        className="
      absolute top-[20%] right-[-8rem]
      w-[24rem] h-[24rem]
      rounded-full
      bg-pink-300/20
      blur-3xl
      pointer-events-none
    "
      /> */}

      {/* <div
        className="
      absolute bottom-[-10rem] left-[35%]
      w-[22rem] h-[22rem]
      rounded-full
      bg-blue-300/20
      blur-3xl
      pointer-events-none
    "
      /> */}
      <div className="containerclass flex justify-between items-center">
        <div className=" w-[50%] ">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  className={`h-2 w-2 rounded-full bg-secondary`}
                  key={item}
                ></div>
              ))}
            </div>
            <App_Text
              children={"LITACE INTERIORS"}
              className="text-xs font-bold tracking-wider text-primary"
            />
          </div>
          <App_Full_Text
            className=" flex flex-col gap-10"
            text={{
              className: "gap-6",
              header: {
                motionObj: {
                  initial: {
                    opacity: 0,
                    y: 30,
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                  },
                  transition: {
                    duration: 1,
                  },
                },
                variant: "hero",

                className:
                  "font-heading tracking-tight leading-[1.1] font-extrabold",
                children: (
                  <>
                    The Gold Standard{" "}
                    <span className="block">
                      for{" "}
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={heroTexts[active]}
                          initial={{
                            opacity: 0,
                            y: 20,
                            // filter: "blur(8px)",
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            opacity: 0,
                            y: -10,
                            filter: "blur(8px)",
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="text-primary font-normal font-accent italic inline-block"
                        >
                          {heroTexts[active]}.
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    {/* <span>&amp; Church</span> */}
                  </>
                ),
              },
              para: {
                className: "lg:text-lg w-[80%]",
                children:
                  "Premier manufacturer and supplier across the SADC region. Elevating communal spaces through artisanal precision.",
              },
            }}
            dbtn={{
              className: "mt-4 w-[60%] flex gap-4",
              motionObj: {
                initial: {
                  opacity: 0,
                  y: 20,
                },
                animate: {
                  opacity: 1,
                  y: 0,
                },
                transition: {
                  delay: 0.4,
                  duration: 0.8,
                },
              },
              btn1: {
                text: "Shop Now",
                btnStyle: "text-white py-5 rounded-full flex-1",
                onPress: () => {
                  console.log("Shop Now");
                },
              },
              btn2: {
                text: "Learn More",
                btnStyle:
                  "flex-1 py-5 rounded-full bg-transparent border border-primary text-primary",
                onPress: () => {
                  console.log("Learn More");
                },
              },
            }}
          />
        </div>
        <motion.div
          className="lg:w-[45%] lg:h-[600px] w-[50%] relative"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <App_Slider
            images={[
              "/tmp/images/conference_chair-2.png",
              "/tmp/images/conference_chair-2.png",
              "/tmp/images/conference_chair-2.png",
              "/tmp/images/conference_chair-2.png",
            ]}
            imgContainerStyle="flex-[0_0_100%] bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent"
            loop={true}
          />
          <Home_Hero_Image_Card />
        </motion.div>
      </div>
    </section>
  );
};

export default Home_Hero;
