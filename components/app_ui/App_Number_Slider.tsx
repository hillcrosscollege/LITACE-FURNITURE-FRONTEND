import { Dispatch, SetStateAction } from "react";
import { Slider } from "@/components/ui/slider";

const App_Number_Slider = ({
  price,
  setPrice,
}: {
  price: number[];
  setPrice: Dispatch<SetStateAction<number[]>>;
}) => {
  return (
    <div className="space-y-2 flex-1 w-full">
      <Slider
        defaultValue={[50, 500]}
        min={0}
        max={1000}
        step={10}
        value={price}
        onValueChange={(val) => setPrice(val)}
        className="w-full bg-gray-500 h-1"
      />

      <div className="flex justify-between text-sm text-gray-300">
        <span>R {price[0]}</span>
        <span>R {price[1]}</span>
      </div>
    </div>
  );
};

export default App_Number_Slider;
