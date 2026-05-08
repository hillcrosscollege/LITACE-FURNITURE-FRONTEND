import App_Button from "@/components/app_ui/App_Button";
import App_Paragraph from "@/components/app_ui/App_Paragraph";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { IProduct } from "../../home_view/home_types";

const Single_Product = ({ name, tag, price, image }: IProduct) => {
  return (
    <div
      className="bg-surface-container-low p-4 rounded-lg group transition-all bg-white duration-500 hover:bg-surface-container border border-purple-50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.12)] hover:border-2 hover:border-primary/50
    "
    >
      <div className="aspect-square bg-white rounded-lg overflow-hidden mb-2 border border-purple-50 relative">
        {tag && (
          <div className="bg-primary text-sm py-1 px-3 text-white rounded-lg absolute top-2 left-2">
            New
          </div>
        )}
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="space-y-1">
        <h3 className="font-headline font-bold text-base">{name}</h3>

        <p className="text-xs font-body text-on-surface-variant italic">
          {name}
        </p>

        <div className="flex justify-between items-center">
          <App_Paragraph
            text={`R ${price}`}
            style="font-black text-xl text-primary"
          />

          <App_Button
            icon={<ShoppingCart size={18} />}
            text=""
            onPress={() => {}}
            btnStyle="bg-white text-primary w-12 h-12 rounded-full shadow-sm hover:bg-primary hover:text-white transition-colors border border-purple-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Single_Product;
