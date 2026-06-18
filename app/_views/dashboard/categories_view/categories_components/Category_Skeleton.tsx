import { SkeletonBox } from "../../customers_view/customers_components/Customer_Skeleton";

// components/ui/skeletons/Skeleton_Base.tsx (add)
export const Skeleton_Category_Card = () => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
    <SkeletonBox className="w-full h-40" />
    <div className="p-3 space-y-2">
      <SkeletonBox className="h-4 w-28" />
      <SkeletonBox className="h-3 w-20" />
    </div>
    <div className="flex items-center gap-2 px-3 pb-3">
      <SkeletonBox className="flex-1 h-8 rounded-lg" />
      <SkeletonBox className="w-8 h-8 rounded-lg" />
    </div>
  </div>
);

export const Skeleton_Category_Row = () => (
  <tr className="border-b border-[#f5f2ee]">
    <td className="py-3 px-4">
      <div className="flex items-center gap-3">
        <SkeletonBox className="w-10 h-10 rounded-lg flex-shrink-0" />
        <SkeletonBox className="h-4 w-28" />
      </div>
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-3 w-48" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-8" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-5 w-16 rounded-full" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-8" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-24" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-6 w-6 rounded" />
    </td>
  </tr>
);

export const Skeleton_Category_Detail = () => (
  <div className="space-y-4">
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5">
      <div className="flex flex-col sm:flex-row gap-5">
        <SkeletonBox className="w-full sm:w-48 h-44 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <SkeletonBox className="h-7 w-40" />
            <SkeletonBox className="h-5 w-14 rounded-full" />
          </div>
          <SkeletonBox className="h-3 w-48" />
          <SkeletonBox className="h-3 w-64" />
          <div className="grid grid-cols-4 gap-3 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3 space-y-1.5"
              >
                <SkeletonBox className="h-3 w-20" />
                <SkeletonBox className="h-5 w-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3"
          >
            <SkeletonBox className="h-4 w-32" />
            {Array.from({ length: 5 }).map((_, j) => (
              <div
                key={j}
                className="flex justify-between py-2 border-b border-[#ede8e2] last:border-0"
              >
                <SkeletonBox className="h-3 w-24" />
                <SkeletonBox className="h-3 w-28" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);
