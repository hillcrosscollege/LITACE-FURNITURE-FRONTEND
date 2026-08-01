"use client";

import App_Text from "@/components/app_ui/App_Text";
import { formatCurrency } from "../../../analytics_view/overview_view/overview_data/overview_data";
import { useShippingRates } from "../shipping_hooks/useShippingQueries";
import App_Loader from "@/components/app_ui/App_Loader";

const Shipping_Rates_Tab = () => {
  const { data: rates, isLoading } = useShippingRates();

  if (isLoading || !rates)
    return <App_Loader label="Loading shipping rates..." />;

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#ede8e2]">
              {["Method", "Zone", "Rate", "Free Shipping Above"].map((h) => (
                <th key={h} className="text-left py-3 px-4">
                  <App_Text variant="tableHeader">{h}</App_Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr
                key={rate.id}
                className="border-b border-[#f5f2ee] last:border-0 hover:bg-[#faf9f7]"
              >
                <td className="py-3 px-4">
                  <App_Text variant="tableCell" className="font-medium">
                    {rate.methodName}
                  </App_Text>
                </td>
                <td className="py-3 px-4">
                  <App_Text variant="tableCellMuted">{rate.zoneName}</App_Text>
                </td>
                <td className="py-3 px-4">
                  <App_Text variant="tableCell" className="font-semibold">
                    {formatCurrency(rate.rate)}
                  </App_Text>
                </td>
                <td className="py-3 px-4">
                  <App_Text variant="tableCellMuted">
                    {rate.freeAbove ? formatCurrency(rate.freeAbove) : "—"}
                  </App_Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shipping_Rates_Tab;
