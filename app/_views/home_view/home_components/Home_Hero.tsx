"use client";
import Home_Hero_Image_Card from "./Home_Hero_Image_Card";
import App_Slider from "@/components/app_ui/App_Slider";
import App_Text from "@/components/app_ui/App_Text";
import App_Full_Text from "@/components/shared/App_Full_Text";
import { ArrowRightCircleIcon, ArrowRightIcon } from "lucide-react";
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
    <section className="w-full py-12 md:py-20 lg:py-24 h-full relative overflow-x-clip">
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
      <div className="containerclass flex flex-col md:flex-row  items-center md:justify-between">
        <div className="md:w-[55%] flex flex-col justify-center items-center text-center md:items-start md:text-left">
          <div className="flex items-center gap-4 mb-4 ">
            <div className="flex gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  className={`h-1 w-1 rounded-full bg-secondary`}
                  key={item}
                ></div>
              ))}
            </div>
            <App_Text
              children={"LITACE INTERIORS"}
              className="text-[10px] md:text-xs font-bold tracking-wider text-primary"
            />
          </div>
          <App_Full_Text
            className=" flex flex-col gap-4 lg:gap-10"
            text={{
              className: "gap-2 lg:gap-6",
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

                className: "font-heading tracking-tight leading-[1.1]",
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
                          className="text-primary italic inline-block"
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
                className: "lg:text-lg lg:w-[70%] font-semibold text-muted",
                children:
                  "Premier manufacturer and supplier across the SADC region. Elevating communal spaces through artisanal precision.",
              },
            }}
            dbtn={{
              className:
                "lg:mt-4 w-[90%] lg:w-[60%] mx-auto md:ml-0 flex gap-2",
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
                btnStyle:
                  "text-white py-3 lg:py-6 rounded-full flex-1 gap-4 items-center font-bold lg:text-lg",
                onPress: () => {
                  console.log("Shop Now");
                },
                icon: <ArrowRightCircleIcon size={30} />,
              },
              btn2: {
                text: "Learn More",
                btnStyle:
                  "flex-1 py-3 lg:py-6 rounded-full bg-transparent border border-primary text-primary font-bold lg:text-lg",
                onPress: () => {
                  console.log("Learn More");
                },
              },
            }}
          />
        </div>
        <motion.div
          className="md:w-[45%] md:h-[400px] lg:h-[600px] mt-6 lg:mt-0 w-full relative"
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
              "/conference_chair-2.png",
              "/home_sofa.png",
              "/conference_chair-2.png",
              "/home_sofa.png",
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
