"use client";

import { cn } from "@/lib/utils";

export const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-[#ede8e2] rounded-lg", className)} />
);

// Stat card skeleton
export const Skeleton_Stat_Card = () => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm space-y-3">
    <div className="flex items-start justify-between">
      <SkeletonBox className="h-3 w-24" />
      <SkeletonBox className="h-8 w-8 rounded-lg" />
    </div>
    <SkeletonBox className="h-7 w-32" />
    <SkeletonBox className="h-3 w-20" />
  </div>
);

// Table row skeleton
export const Skeleton_Table_Row = ({ cols = 7 }: { cols?: number }) => (
  <tr className="border-b border-[#f5f2ee]">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="py-3 px-4">
        <SkeletonBox
          className={`h-4 ${i === 0 ? "w-36" : i === cols - 1 ? "w-16" : "w-24"}`}
        />
      </td>
    ))}
  </tr>
);

// Customer row skeleton (has avatar)
export const Skeleton_Customer_Row = () => (
  <tr className="border-b border-[#f5f2ee]">
    <td className="py-3 px-4">
      <div className="flex items-center gap-2">
        <SkeletonBox className="w-7 h-7 rounded-full shrink-0" />
        <SkeletonBox className="h-4 w-28" />
      </div>
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-36" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-28" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-8" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-24" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-20" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-5 w-16 rounded-full" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-6 w-6 rounded" />
    </td>
  </tr>
);

// Customer detail header skeleton
export const Skeleton_Customer_Header = () => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5">
    <div className="flex flex-col sm:flex-row gap-4 items-start">
      <SkeletonBox className="w-20 h-20 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBox className="h-6 w-40" />
        <SkeletonBox className="h-4 w-56" />
        <SkeletonBox className="h-4 w-48" />
      </div>
      <div className="flex gap-2 shrink-0">
        <SkeletonBox className="h-8 w-24 rounded-lg" />
        <SkeletonBox className="h-8 w-16 rounded-lg" />
        <SkeletonBox className="h-8 w-16 rounded-lg" />
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3 space-y-2"
        >
          <SkeletonBox className="h-3 w-20" />
          <SkeletonBox className="h-6 w-12" />
          <SkeletonBox className="h-3 w-16" />
        </div>
      ))}
    </div>
  </div>
);

// Overview tab skeleton
export const Skeleton_Overview_Tab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
);

// components/ui/skeletons/Skeleton_Base.tsx (add to existing)
export const Skeleton_Receipt_Row = () => (
  <tr className="border-b border-[#f5f2ee]">
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-20" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-24" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-28" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-4 w-20" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-5 w-20 rounded-full" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBox className="h-6 w-16 rounded-lg" />
    </td>
  </tr>
);

export const Skeleton_Message_Item = () => (
  <div className="p-4 border-b border-[#f5f2ee] space-y-2">
    <div className="flex items-center justify-between">
      <SkeletonBox className="h-4 w-48" />
      <SkeletonBox className="h-3 w-24" />
    </div>
    <SkeletonBox className="h-3 w-full" />
    <SkeletonBox className="h-3 w-3/4" />
  </div>
);

export const Skeleton_Settings = () => (
  <div className="space-y-4 max-w-2xl">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3"
      >
        <SkeletonBox className="h-4 w-32" />
        {Array.from({ length: 3 }).map((_, j) => (
          <div key={j} className="flex items-center justify-between py-2">
            <div className="space-y-1">
              <SkeletonBox className="h-3 w-36" />
              <SkeletonBox className="h-3 w-48" />
            </div>
            <SkeletonBox className="h-6 w-11 rounded-full" />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const Skeleton_Order_Detail = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <SkeletonBox className="h-7 w-36" />
      <SkeletonBox className="h-6 w-20 rounded-full" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-[#faf9f7] rounded-xl border border-[#ede8e2]"
          >
            <SkeletonBox className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <SkeletonBox className="h-4 w-40" />
              <SkeletonBox className="h-3 w-24" />
            </div>
            <SkeletonBox className="h-4 w-20" />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <SkeletonBox className="h-40 rounded-xl" />
        <SkeletonBox className="h-32 rounded-xl" />
      </div>
    </div>
  </div>
);
