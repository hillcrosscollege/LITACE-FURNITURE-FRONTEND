import { SkeletonBox } from "../../customers_view/customers_components/Customer_Skeleton";

export const Chart_Skeleton = () => (
  <div className="bg-white flex-1 rounded-2xl border border-[#ede8e2] p-4 shadow-sm space-y-3">
    <div className="flex items-center justify-between">
      <SkeletonBox className="h-4 w-28" />
      <SkeletonBox className="h-7 w-28 rounded-lg" />
    </div>
    <SkeletonBox className="h-48 w-full rounded-xl" />
  </div>
);

export const Orders_Skeleton = () => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm w-[40%] space-y-3">
    <SkeletonBox className="h-4 w-24" />
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        <SkeletonBox className="w-10 h-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-1.5">
          <SkeletonBox className="h-3 w-32" />
          <SkeletonBox className="h-3 w-16" />
        </div>
        <div className="space-y-1.5 items-end flex flex-col">
          <SkeletonBox className="h-3 w-16" />
          <SkeletonBox className="h-4 w-20 rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

export const Stat_Skeleton = () => (
  <div className="bg-white/10 rounded-2xl p-4 space-y-3">
    <div className="flex items-start justify-between">
      <SkeletonBox className="h-3 w-20 bg-white/20" />
      <SkeletonBox className="h-8 w-8 rounded-lg bg-white/20" />
    </div>
    <SkeletonBox className="h-7 w-28 bg-white/20" />
    <SkeletonBox className="h-3 w-24 bg-white/20" />
  </div>
);

export const Table_Skeleton = () => (
  <div className="flex-1 bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm space-y-3">
    <SkeletonBox className="h-4 w-32" />
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-2 py-2 border-b border-[#f5f2ee] last:border-0"
      >
        <SkeletonBox className="w-7 h-7 rounded flex-shrink-0" />
        <div className="flex-1 space-y-1">
          <SkeletonBox className="h-3 w-32" />
        </div>
        <SkeletonBox className="h-3 w-16" />
        <SkeletonBox className="h-3 w-8" />
        <SkeletonBox className="h-3 w-20" />
      </div>
    ))}
  </div>
);

export const Stock_Skeleton = () => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm space-y-3 w-72">
    <SkeletonBox className="h-4 w-24" />
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        <SkeletonBox className="w-10 h-10 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-1.5">
          <SkeletonBox className="h-3 w-28" />
          <SkeletonBox className="h-3 w-16" />
        </div>
        <SkeletonBox className="h-7 w-16 rounded-lg" />
      </div>
    ))}
  </div>
);
