import { variants } from "@/components/app_ui/App_Text";
import { LucideIcon } from "lucide-react";
import { HTMLMotionProps } from "motion/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { ReactNode } from "react";
import {
  FieldErrors,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type TextVariantType = keyof typeof variants;
type TextTags = "h1" | "h2" | "h3" | "h4" | "p";

export interface IAppText {
  variant?: TextVariantType;
  className?: string;
  children: ReactNode;
  motionObj?: HTMLMotionProps<TextTags>;
}

export interface IText {
  text: string;
  extra?: ReactNode;
  style?: string;
}

export interface IHeader extends IText {
  text: string;
  type: Text_Type;
}

export interface IParagraph {
  text: string;
  sub_text?: ReactNode;
  style?: string;
}

export type Text_Type = "title" | "subhead" | "cardhead" | "mini";

export interface IButton {
  text: string;
  icon?: ReactNode;
  btnStyle?: string;
  onPress?: () => void;
  type?: "button" | "submit" | "reset";
}

export interface IImg {
  src: StaticImport | string;
  alt: string;
  style?: string;
  imgContainerStyle?: string;
  extra?: ReactNode;
}

export interface IDoubleText {
  header?: IAppText;
  para?: IAppText;
  className?: string;
}
export interface IDoubleBtn {
  btn1: IButton;
  btn2: IButton;
  className?: string;
  motionObj?: HTMLMotionProps<"div">;
}

export interface IFullText {
  text: IDoubleText;
  btn?: IButton;
  className?: string;
  extra?: ReactNode;
  dbtn?: IDoubleBtn;
}

export interface IGrouped {
  full_text: IFullText;
  img: IImg;
  groupStyle: string;
}

export interface IAppInput<T extends Record<string, any>> {
  name: Path<T>;
  errors?: FieldErrors<T>;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  className?: string;
  placeholder?: string;
  containerStyle?: string;
  icon1?: ReactNode;
  icon2?: ReactNode;
  showLabel?: boolean;
  basic?: boolean;
  onChange?: () => {};
}

export interface IApp_Drop_Down {
  icon: LucideIcon;
  text: string;
  action: () => void;
  className?: string;
  separatorBefore?: boolean;
}

export interface IApp_Modal {
  onClose: () => void;
  children: ReactNode;
  text: string;
}
