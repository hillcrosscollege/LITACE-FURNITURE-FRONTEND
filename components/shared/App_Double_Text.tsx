import { IAppText, IDoubleText } from "@/types";
import App_Text from "../app_ui/App_Text";
import { cn } from "@/lib/utils";

const renderText = (item: IAppText) => (
  <App_Text
    variant={item.variant}
    className={item.className}
    motionObj={item.motionObj}
  >
    {item.children}
  </App_Text>
);

const App_Double_Text = ({ header, para, className }: IDoubleText) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {header && renderText(header)}
      {para && renderText(para)}
    </div>
  );
};

export default App_Double_Text;
