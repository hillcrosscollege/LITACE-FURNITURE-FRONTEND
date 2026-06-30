import { SkeletonBox } from "../../../customers_view/customers_components/Customer_Skeleton";

// components/ui/skeletons/Skeleton_Base.tsx (add to existing)
export const Skeleton_Analytics_Stat = () => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm space-y-3">
    <div className="flex items-center gap-2">
      <SkeletonBox className="h-9 w-9 rounded-xl" />
      <SkeletonBox className="h-3 w-24" />
    </div>
    <SkeletonBox className="h-7 w-28" />
    <SkeletonBox className="h-3 w-32" />
  </div>
);

export const Skeleton_Chart_Card = ({
  height = "h-64",
}: {
  height?: string;
}) => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
    <SkeletonBox className="h-4 w-40" />
    <SkeletonBox className={`w-full ${height} rounded-xl`} />
  </div>
);

export const Skeleton_Mini_List = ({ rows = 5 }: { rows?: number }) => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
    <SkeletonBox className="h-4 w-32" />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 py-1.5">
        <SkeletonBox className="w-9 h-9 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-1.5">
          <SkeletonBox className="h-3 w-32" />
          <SkeletonBox className="h-3 w-20" />
        </div>
        <SkeletonBox className="h-4 w-16" />
      </div>
    ))}
  </div>
);

export const Skeleton_Section_Preview_Card = () => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
    <div className="flex items-center justify-between">
      <SkeletonBox className="h-3 w-20" />
      <SkeletonBox className="h-6 w-6 rounded-lg" />
    </div>
    <SkeletonBox className="h-7 w-24" />
    <SkeletonBox className="h-3 w-28" />
  </div>
);
