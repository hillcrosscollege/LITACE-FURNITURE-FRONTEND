import App_Button from "@/components/app_ui/App_Button";
import App_Paragraph from "@/components/app_ui/App_Paragraph";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { IProduct } from "../home_types";
import Chair from "@/app/tmp/images/diamond_black_1.jpg";

const Home_Product_Card = (product: IProduct) => {
  return (
    <div
      className="bg-surface-container-low p-4 rounded-2xl group transition-all bg-white duration-500 hover:bg-surface-container border border-purple-50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.12)] hover:border-2 hover:border-primary/50
    "
    >
      <div className="aspect-square relative bg-white rounded-xl overflow-hidden mb-4 border border-purple-50">
        {product.tag && (
          <div className="bg-primary text-xs absolute top-2 left-2 rounded-lg text-white px-4 py-1">
            <p>New</p>
          </div>
        )}
        <Image
          src={product.image}
          alt={product.name || "Product image"}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="space-y-1">
        <h3 className="font-headline font-bold text-lg">{product.name}</h3>

        <p className="text-sm font-body text-on-surface-variant italic">
          {product.category}
        </p>

        <div className="flex justify-between items-center pt-4">
          <App_Paragraph
            text={`R ${product.price}`}
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

export default Home_Product_Card;
