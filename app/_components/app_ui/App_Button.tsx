import { ReactNode } from "react";
interface IButton {
  text: string;
  icon?: ReactNode;
  style?: string;
  btnStyle?: string;
  onPress: () => {};
}

const App_Button = ({ text, icon, btnStyle, onPress }: IButton) => {
  return (
    <button onClick={onPress} className={btnStyle}>
      {text} {icon && icon}
    </button>
  );
};

export default App_Button;
