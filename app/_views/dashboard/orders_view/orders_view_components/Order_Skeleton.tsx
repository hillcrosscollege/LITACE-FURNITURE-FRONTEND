import { SkeletonBox } from "../../customers_view/customers_components/Customer_Skeleton";

// components/ui/skeletons/Skeleton_Base.tsx (add to existing)
export const Skeleton_Order_Stat = () => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm space-y-3">
    <div className="flex items-start justify-between">
      <SkeletonBox className="h-3 w-20" />
      <SkeletonBox className="h-8 w-8 rounded-lg" />
    </div>
    <SkeletonBox className="h-7 w-16" />
    <SkeletonBox className="h-3 w-24" />
  </div>
);

export const Skeleton_Order_Row = () => (
  <tr className="border-b border-[#f5f2ee]">
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-20" />
    </td>
    <td className="py-3 px-4">
      <div className="flex items-center gap-2">
        <SkeletonBox className="w-7 h-7 rounded-full shrink-0" />
        <SkeletonBox className="h-4 w-24" />
      </div>
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-20" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-12" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-20" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-5 w-12 rounded-full" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-5 w-20 rounded-full" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-20" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-6 w-6 rounded" />
    </td>
  </tr>
);

export const Skeleton_Order_Detail_Header = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <SkeletonBox className="h-7 w-32" />
      <SkeletonBox className="h-6 w-20 rounded-full" />
    </div>
    <div className="flex items-center gap-3">
      <SkeletonBox className="h-8 w-28 rounded-lg" />
      <SkeletonBox className="h-8 w-32 rounded-lg" />
      <SkeletonBox className="h-8 w-20 rounded-lg" />
    </div>
    <SkeletonBox className="h-3 w-48" />
  </div>
);

export const Skeleton_Order_Tab_Content = () => (
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
    <div className="xl:col-span-2 space-y-4">
      {/* Customer card */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
        <SkeletonBox className="h-4 w-20" />
        <div className="flex items-center gap-3">
          <SkeletonBox className="w-10 h-10 rounded-full shrink-0" />
          <div className="space-y-1.5 flex-1">
            <SkeletonBox className="h-4 w-32" />
            <SkeletonBox className="h-3 w-40" />
            <SkeletonBox className="h-3 w-28" />
          </div>
        </div>
      </div>

      {/* Order items */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
        <SkeletonBox className="h-4 w-24" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-2 border-b border-[#ede8e2] last:border-0"
          >
            <SkeletonBox className="w-10 h-10 rounded-lg shrink-0" />
            <div className="flex-1 space-y-1.5">
              <SkeletonBox className="h-4 w-40" />
              <SkeletonBox className="h-3 w-24" />
            </div>
            <SkeletonBox className="h-4 w-16" />
            <SkeletonBox className="h-4 w-8" />
            <SkeletonBox className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-2">
        <SkeletonBox className="h-4 w-28" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex justify-between py-1.5">
            <SkeletonBox className="h-3 w-24" />
            <SkeletonBox className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Bottom 3 cols */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-2"
          >
            <SkeletonBox className="h-4 w-24" />
            {Array.from({ length: 4 }).map((_, j) => (
              <SkeletonBox key={j} className="h-3 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>

    {/* Timeline */}
    <div className="bg-white rounded-xl border border-[#ede8e2] shadow-sm p-4 space-y-4">
      <SkeletonBox className="h-4 w-24" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 py-2">
          <SkeletonBox className="w-7 h-7 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <SkeletonBox className="h-3 w-28" />
            <SkeletonBox className="h-3 w-36" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
