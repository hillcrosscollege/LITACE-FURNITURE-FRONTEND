"use client";
import { cn } from "@/lib/utils";
import App_Button from "./App_Button";
import { IDoubleBtn } from "@/types/ui_types";
import { motion } from "motion/react";

const App_Double_Btn = ({ className, btn1, btn2, motionObj }: IDoubleBtn) => {
  return (
    <motion.div className={cn("flex gap-4", className)} {...motionObj}>
      <App_Button
        btnStyle={btn1.btnStyle}
        text={btn1.text}
        icon={btn1.icon}
        onPress={btn1.onPress}
        type={btn1.type}
      />
      <App_Button
        btnStyle={btn2.btnStyle}
        text={btn2.text}
        icon={btn2.icon}
        onPress={btn2.onPress}
        type={btn2.type}
      />
    </motion.div>
  );
};

export default App_Double_Btn;
