import { IFullText } from "@/types";
import App_Button from "../app_ui/App_Button";
import App_Double_Text from "./App_Double_Text";
import { cn } from "@/lib/utils";
import App_Double_Btn from "../app_ui/App_Double_Btn";

const App_Full_Text = ({ className, btn, text, extra, dbtn }: IFullText) => {
  return (
    <div className={cn("flex gap-4", className)}>
      {extra}

      <App_Double_Text
        header={text.header}
        para={text.para}
        className={text.className}
      />

      {btn && (
        <App_Button
          text={btn.text}
          btnStyle={btn.btnStyle}
          onPress={btn.onPress}
          icon={btn.icon}
          type={btn.type}
        />
      )}
      {dbtn && (
        <App_Double_Btn
          btn1={dbtn.btn1}
          btn2={dbtn.btn2}
          className={dbtn.className}
        />
      )}
    </div>
  );
};

export default App_Full_Text;
