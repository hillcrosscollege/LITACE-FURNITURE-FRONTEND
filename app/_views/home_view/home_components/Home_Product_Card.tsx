import App_Button from "@/components/app_ui/App_Button";
import App_Paragraph from "@/components/app_ui/App_Paragraph";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { IProduct } from "../home_types";
import Link from "next/link";

const Home_Product_Card = (product: IProduct) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white border border-purple-100 p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30">
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-linear-to-br from-primary/5 via-transparent to-secondary/10" />

      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {product.tag && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full">
            New Arrival
          </div>
        )}

        <div className=" absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <App_Button
            text=""
            icon={<ShoppingCart size={18} />}
            onPress={() => {}}
            btnStyle=" !w-12 !h-12 !min-w-12 rounded-full bg-white text-primary shadow-xl hover:scale-110 transition-transform"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-5 space-y-3">
        <div>
          <h3 className="font-headline text-lg font-semibold">
            {product.name}
          </h3>

          <App_Paragraph
            text={product.category}
            style="text-sm text-gray-500"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-1 text-amber-500">
          ★★★★☆
          <span className="text-gray-500 text-xs ml-1">(24 Reviews)</span>
        </div>

        <div className="flex items-center justify-between">
          <App_Paragraph
            text={`R ${product.price}`}
            style="text-xl font-black text-primary"
          />

          <Link href={`/products/${product.id}`}>
            <App_Button
              text=""
              icon={<ArrowRight size={18} />}
              onPress={() => {}}
              btnStyle=" !w-11 !h-11 !min-w-11 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home_Product_Card;
