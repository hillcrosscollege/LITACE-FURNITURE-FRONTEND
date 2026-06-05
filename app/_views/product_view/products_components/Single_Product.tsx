import App_Button from "@/components/app_ui/App_Button";
import App_Paragraph from "@/components/app_ui/App_Paragraph";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "../../home_view/home_types";

const Single_Product = ({ name, tag, price, image }: IProduct) => {
  return (
    <Link
      href={"/products/1"}
      className=" group relative overflow-hidden bg-white p-2 py-4 md:p-4 rounded-lg border border-purple-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:border-primary/30"
    >
      {/* Glow Effect */}
      <div className=" absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-linear-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none" />

      {/* Product Image */}
      <div className="aspect-square bg-surface-container-low rounded-xl overflow-hidden mb-3 border border-purple-50 relative">
        {tag && (
          <div className="absolute top-2 left-2 z-10 bg-primary text-white text-[10px] md:text-xs font-medium px-2 py-1 rounded-md">
            New
          </div>
        )}

        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className=" w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <App_Button
            icon={<ShoppingCart size={18} />}
            text=""
            onPress={() => {}}
            btnStyle="!w-12 !h-12 rounded-full bg-white text-primary shadow-lg hover:scale-110 transition-transform"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 relative z-10">
        <h3 className="font-headline font-bold text-sm md:text-base xl:text-lg line-clamp-1 transition-colors duration-300 group-hover:text-primary">
          {name}
        </h3>

        <p className="text-sm font-body text-on-surface-variant italic">
          Premium Collection
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-amber-500 text-sm">
          ★★★★☆
          <span className="text-xs text-gray-500 ml-1">(24 Reviews)</span>
        </div>

        {/* Price & CTA */}
        <div className="flex justify-between items-center pt-2">
          <App_Paragraph
            text={`R ${price}`}
            style="font-black text-sm md:text-base xltext-lg text-primary"
          />

          <App_Button
            text="Add to Cart"
            onPress={() => {}}
            btnStyle="bg-primary text-white shadow-sm transition-all duration-300 hover:scale-110 hidden md:block"
          />
          <App_Button
            icon={<ShoppingCart size={18} />}
            text=""
            onPress={() => {}}
            btnStyle="!w-12 !h-12 rounded-full bg-white text-primary shadow-lg hover:scale-110 transition-transform md:hidden"
          />
        </div>
      </div>
    </Link>
  );
};

export default Single_Product;
