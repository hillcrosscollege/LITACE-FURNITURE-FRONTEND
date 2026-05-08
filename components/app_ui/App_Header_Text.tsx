import { IHeader, IText, Text_Type } from "@/types";
import React, { ReactNode } from "react";

const App_Header_Text = ({ text, type, extra, style }: IHeader) => {
  const texts: Record<Text_Type, ReactNode> = {
    title: <Title_Head text={text} extra={extra} style={style} />,
    subhead: <Sub_Head text={text} extra={extra} style={style} />,
    mini: <Mini_Head text={text} extra={extra} style={style} />,
    cardhead: <Card_Head text={text} extra={extra} style={style} />,
  };
  return <>{texts[type]}</>;
};

export default App_Header_Text;

const Title_Head = ({ text, extra, style }: IText) => {
  return (
    <h1
      className={`font-bold font-heading text-3xl md:text-5xl xl:text-6xl ${style}`}
    >
      {text} {extra}
    </h1>
  );
};

const Sub_Head = ({ text, extra, style }: IText) => {
  return (
    <h2
      className={`text-2xl font-heading md:text-4xl font-semibold xl:text-5xl ${style}`}
    >
      {text} {extra}
    </h2>
  );
};

const Mini_Head = ({ text, extra, style }: IText) => {
  return (
    <h2 className={`text-xs font-heading font-semibold ${style}`}>
      {text} {extra}
    </h2>
  );
};

const Card_Head = ({ text, extra, style }: IText) => {
  return (
    <h4 className={`text-xl font-heading  ${style}`}>
      {text} {extra}
    </h4>
  );
};
