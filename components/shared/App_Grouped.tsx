import App_Full_Text from "./App_Full_Text";
import { IGrouped } from "@/types";
import Image from "next/image";

const App_Grouped = ({ full_text, img, groupStyle }: IGrouped) => {
  return (
    <section className={groupStyle}>
      <App_Full_Text
        text={full_text.text}
        btn={full_text.btn}
        className={full_text.className}
        extra={full_text.extra}
      />

      <div className={img.imgContainerStyle}>
        {img.extra && img.extra}
        <Image
          src={img.src}
          alt={img.alt}
          className={img.style}
          width={100}
          height={100}
        />
      </div>
    </section>
  );
};

export default App_Grouped;
