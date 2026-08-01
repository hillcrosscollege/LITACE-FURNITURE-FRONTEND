import { SkeletonBox } from "../../customers_view/customers_components/Customer_Skeleton";

export const Skeleton_Store_Row = () => (
  <tr className="border-b border-[#f5f2ee]">
    <td className="py-3 px-4">
      <div className="flex items-center gap-3">
        <SkeletonBox className="w-10 h-10 rounded-lg shrink-0" />
        <SkeletonBox className="h-4 w-32" />
      </div>
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-3 w-28" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-3 w-24" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-3 w-12" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-3 w-20" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-3 w-8" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-3 w-8" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-5 w-14 rounded-full" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-6 w-14 rounded" />
    </td>
  </tr>
);

export const Skeleton_Store_Detail = () => (
  <div className="space-y-4">
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5">
      <div className="flex flex-col sm:flex-row gap-5">
        <SkeletonBox className="w-24 h-24 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <SkeletonBox className="h-7 w-44" />
            <SkeletonBox className="h-5 w-14 rounded-full" />
          </div>
          <SkeletonBox className="h-3 w-32" />
          <SkeletonBox className="h-3 w-48" />
          <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 mt-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3 space-y-1.5"
              >
                <SkeletonBox className="h-3 w-16" />
                <SkeletonBox className="h-5 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
