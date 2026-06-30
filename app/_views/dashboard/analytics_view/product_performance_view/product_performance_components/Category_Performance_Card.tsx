"use client";

import App_Text from "@/components/app_ui/App_Text";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { CategoryPerf } from "../product_performance_types";

const Category_Performance_Card = ({
  categories,
}: {
  categories: CategoryPerf[];
}) => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
    <App_Text variant="cardHeading">Product Categories Performance</App_Text>
    <div className="space-y-0">
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 pb-2 border-b border-[#ede8e2]">
        <App_Text variant="tableHeader">Category</App_Text>
        <App_Text variant="tableHeader">Revenue</App_Text>
        <App_Text variant="tableHeader">% of Total</App_Text>
      </div>
      {categories.map((c) => (
        <div
          key={c.category}
          className="grid grid-cols-[2fr_1fr_1fr] gap-2 py-2.5 border-b border-[#f5f2ee] last:border-0"
        >
          <App_Text variant="tableCell" className="font-medium">
            {c.category}
          </App_Text>
          <App_Text variant="tableCell">{formatCurrency(c.revenue)}</App_Text>
          <App_Text variant="tableCell">{c.pctOfTotal}%</App_Text>
        </div>
      ))}
    </div>
  </div>
);

export default Category_Performance_Card;
