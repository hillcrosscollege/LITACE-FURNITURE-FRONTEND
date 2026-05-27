import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { topProducts, topProductsColumns } from "./dash_data/Top_Selling";

const Dash_Top_Selling = () => {
  return (
    <div className="flex-1">
      {" "}
      <div className="flex-1 p-4 border bg-white rounded-lg">
        <App_Text children="Recentle Result" />
        <App_Table
          columns={topProductsColumns}
          data={topProducts}
          childRowStyle="border-b border-[#f5f2ee] last:border-0"
        />
      </div>
    </div>
  );
};

export default Dash_Top_Selling;
