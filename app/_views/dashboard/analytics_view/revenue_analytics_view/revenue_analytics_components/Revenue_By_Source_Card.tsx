// "use client";

// import { useRouter } from "next/navigation";
// import { RevenueSource } from "../revenue_analytics_types";
// import App_Table from "@/components/app_ui/App_Table";
// import App_Text from "@/components/app_ui/App_Text";
// import { revenueSourceColumns } from "../revenue_analytics_data/revenue_source_col";

// const Revenue_By_Source_Card = ({
//   sources,
//   compact = false,
// }: {
//   sources: RevenueSource[];
//   compact?: boolean;
// }) => {
//   const router = useRouter();
//   const columns = compact
//     ? revenueSourceColumns.slice(0, 4)
//     : revenueSourceColumns;

//   return (
//     <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
//       <App_Text variant="cardHeading">Revenue by Source</App_Text>
//       <App_Table
//         columns={columns}
//         data={sources}
//         style="mt-0"
//         childRowStyle=""
//       />
//       <button
//         type="button"
//         onClick={() =>
//           router.push("/dashboard/sales-analytics/revenue-analytics/sources")
//         }
//         className="text-xs text-primary hover:underline flex items-center gap-1"
//       >
//         View all sources →
//       </button>
//     </div>
//   );
// };

// export default Revenue_By_Source_Card;
