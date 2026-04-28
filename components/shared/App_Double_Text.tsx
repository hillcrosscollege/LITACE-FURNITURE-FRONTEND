import { IDoubleText } from "@/types";
import App_Header_Text from "../app_ui/App_Header_Text";
import App_Paragraph from "../app_ui/App_Paragraph";

const App_Double_Text = ({ para, header, textContentStyle }: IDoubleText) => {
  return (
    <aside className={`flex flex-col gap-2 ${textContentStyle}`}>
      {header && <App_Header_Text {...header} />}
      {para && <App_Paragraph {...para} />}
    </aside>
  );
};

export default App_Double_Text;
