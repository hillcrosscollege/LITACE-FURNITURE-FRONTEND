import { IParagraph } from "@/types";

const App_Paragraph = ({ text, style, sub_text }: IParagraph) => {
  return (
    <p
      className={`${style ? style : "text-base md:text-lg lg:text-xl text-gray-600"}`}
    >
      {text}
      {sub_text && sub_text}
    </p>
  );
};

export default App_Paragraph;
