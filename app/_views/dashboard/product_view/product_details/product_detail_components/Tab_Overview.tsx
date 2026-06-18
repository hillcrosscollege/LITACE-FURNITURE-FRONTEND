"use client";

import App_Text from "@/components/app_ui/App_Text";
import { productDetail } from "../product_detail_data";

const InfoGrid = ({
  title,
  data,
}: {
  title: string;
  data: Record<string, string>;
}) => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm flex-1 min-w-0">
    <App_Text variant="cardHeading" className="mb-4">
      {title}
    </App_Text>
    <div className="flex flex-col divide-y divide-[#f5f2ee]">
      {Object.entries(data).map(([key, val]) => (
        <div
          key={key}
          className="flex items-center justify-between py-2.5 gap-4"
        >
          <App_Text variant="tableCellMuted" className="shrink-0">
            {key}
          </App_Text>
          <App_Text variant="tableCell" className="font-medium text-right">
            {val}
          </App_Text>
        </div>
      ))}
    </div>
  </div>
);

const Tab_Overview = () => {
  const { information, pricing, shipping, description } = productDetail;
  return (
    <div className="space-y-4">
      {/* Description */}
      <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm">
        <App_Text variant="cardHeading" className="mb-2">
          Description
        </App_Text>
        <App_Text variant="tableCellMuted">{description}</App_Text>
      </div>

      {/* 3 info grids */}
      <div className="flex flex-col lg:flex-row gap-4">
        <InfoGrid title="Product Information" data={information} />
        <InfoGrid title="Pricing" data={pricing} />
        <InfoGrid title="Shipping" data={shipping} />
      </div>
    </div>
  );
};

export default Tab_Overview;
