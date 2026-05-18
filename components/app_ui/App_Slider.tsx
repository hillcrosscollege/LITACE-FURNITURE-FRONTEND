"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Fade from "embla-carousel-fade";

type Props = {
  images: string[];
  dots?: boolean;
  btn?: boolean;
  imgContainerStyle?: string;
  loop?: boolean;
  fade?: boolean;
};

const App_Slider = ({
  images,
  dots,
  btn,
  imgContainerStyle,
  loop,
  fade,
}: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: loop ? true : false,
      duration: 45,
    },
    fade ? [Fade()] : [],
    // [Fade()],
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  React.useEffect(() => {
    if (!emblaApi) return;

    if (loop) {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000);
    }
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="w-full h-full mx-auto">
      {/* Main Slider */}
      <div className="flex gap-2 h-full">
        {btn && (
          <button
            onClick={scrollPrev}
            className="bg-gray-200 max-h-full hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
          >
            <ChevronLeft />
          </button>
        )}
        <div
          className="overflow-hidden rounded-xl h-full w-full"
          ref={emblaRef}
        >
          <div className="flex h-full">
            {images.map((src, index) => (
              <div
                className={cn("flex-[0_0_33.333%] px-2", imgContainerStyle)}
                key={index}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
        {btn && (
          <button
            onClick={scrollNext}
            className="bg-gray-200 max-h-full hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
          >
            <ChevronRight />
          </button>
        )}

        {/* Arrows */}
        {/* <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          <ChevronRight />
        </button> */}
      </div>

      {/* Dots */}
      {dots && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                selectedIndex === index ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App_Slider;
