import { SkeletonBox } from "../../customers_view/customers_components/Customer_Skeleton";

export const Skeleton_Inventory_Row = () => (
  <tr className="border-b border-[#f5f2ee]">
    <td className="py-3 px-4">
      <div className="flex items-center gap-3">
        <SkeletonBox className="w-10 h-10 rounded-lg shrink-0" />
        <SkeletonBox className="h-4 w-32" />
      </div>
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-24" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-20" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-10" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-10" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-10" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-5 w-20 rounded-full" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-28" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-32" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-6 w-6 rounded" />
    </td>
  </tr>
);

export const Skeleton_Inventory_Detail = () => (
  <div className="space-y-4">
    {/* Image + info */}
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5">
      <div className="flex flex-col sm:flex-row gap-5">
        <SkeletonBox className="w-full sm:w-52 h-48 rounded-xl shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <SkeletonBox className="h-7 w-48" />
            <SkeletonBox className="h-5 w-16 rounded-full" />
          </div>
          <SkeletonBox className="h-3 w-64" />
          <SkeletonBox className="h-8 w-28" />
          <SkeletonBox className="h-4 w-56" />
          {/* Thumbnails */}
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBox key={i} className="w-14 h-14 rounded-lg" />
            ))}
          </div>
          {/* Stat row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3 space-y-1.5"
              >
                <SkeletonBox className="h-3 w-20" />
                <SkeletonBox className="h-5 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    {/* Tab content */}
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="space-y-2">
          <SkeletonBox className="h-4 w-36" />
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between py-2 border-b border-[#ede8e2]"
            >
              <SkeletonBox className="h-3 w-24" />
              <SkeletonBox className="h-3 w-28" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-40 w-40 rounded-full mx-auto" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <SkeletonBox className="w-3 h-3 rounded-full" />
              <SkeletonBox className="h-3 w-24" />
              <SkeletonBox className="h-3 w-16 ml-auto" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <SkeletonBox className="h-4 w-28" />
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBox key={i} className="h-10 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const Skeleton_Location_Row = () => (
  <tr className="border-b border-[#f5f2ee]">
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-36" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-10" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-10" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-10" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-6 w-6 rounded" />
    </td>
  </tr>
);

export const Skeleton_Low_Stock_Row = () => (
  <tr className="border-b border-[#f5f2ee]">
    <td className="py-3 px-4">
      <div className="flex items-center gap-3">
        <SkeletonBox className="w-9 h-9 rounded-lg shrink-0" />
        <SkeletonBox className="h-4 w-32" />
      </div>
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-24" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-10" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-10" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-6 w-6 rounded" />
    </td>
  </tr>
);
