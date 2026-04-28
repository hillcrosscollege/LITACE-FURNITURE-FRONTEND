"use client";
import { Button } from "../ui/button";
import { IButton } from "@/types";

const App_Button = ({ text, icon, btnStyle, onPress }: IButton) => {
  return (
    <Button
      onClick={onPress}
      className={`cursor-pointer ${btnStyle}`}
      type="submit"
    >
      {text} {icon && icon}
    </Button>
  );
};

export default App_Button;
