"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { IButton } from "@/types";

const App_Button = ({
  text,
  icon,
  btnStyle,
  onPress,
  type = "button",
}: IButton) => {
  return (
    <Button
      onClick={onPress}
      className={cn("cursor-pointer", btnStyle)}
      type={type}
    >
      {text} {icon && icon}
    </Button>
  );
};

export default App_Button;
