import { StaticImageData } from "next/image";

export interface IProduct {
  image: StaticImageData | string;
  title: string;
  category: string;
  price: string;
}
