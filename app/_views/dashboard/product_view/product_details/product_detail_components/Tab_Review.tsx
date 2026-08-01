// components/products/details/tabs/Tab_Reviews.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import App_Button from "@/components/app_ui/App_Button";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { ColumnDef } from "@tanstack/react-table";

type ReviewStatus = "Published" | "Pending" | "Rejected";

type ProductReview = {
  id: string;
  customer: { name: string; avatar: string };
  rating: number;
  review: string;
  date: string;
  status: ReviewStatus;
};

const reviewStatusStyles: Record<ReviewStatus, string> = {
  Published: "bg-[#e8fdf0] text-[#157a45]",
  Pending: "bg-[#fdf5e0] text-[#8a6300]",
  Rejected: "bg-[#fdecea] text-[#a32020]",
};

const productReviews: ProductReview[] = [
  {
    id: "1",
    customer: { name: "Jane Smith", avatar: "/conference_chair-2.png" },
    rating: 5,
    review: "Excellent quality and very comfortable!",
    date: "May 20, 2024",
    status: "Published",
  },
  {
    id: "2",
    customer: { name: "Michael Brown", avatar: "/conference_chair-2.png" },
    rating: 4,
    review: "Good product, worth the price.",
    date: "May 18, 2024",
    status: "Published",
  },
  {
    id: "3",
    customer: { name: "Emily Davis", avatar: "/conference_chair-2.png" },
    rating: 4,
    review: "Nice sofa, delivery was on time.",
    date: "May 15, 2024",
    status: "Published",
  },
  {
    id: "4",
    customer: { name: "John Doe", avatar: "/conference_chair-2.png" },
    rating: 3,
    review: "Good but assembly instructions were vague.",
    date: "May 12, 2024",
    status: "Pending",
  },
  {
    id: "5",
    customer: { name: "Sarah Johnson", avatar: "/conference_chair-2.png" },
    rating: 2,
    review: "Color was slightly different from photos.",
    date: "May 10, 2024",
    status: "Rejected",
  },
];

const ratingBreakdown = [
  { stars: 5, count: 6 },
  { stars: 4, count: 3 },
  { stars: 3, count: 1 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
];

const totalReviews = ratingBreakdown.reduce((s, r) => s + r.count, 0);
const averageRating = (
  ratingBreakdown.reduce((s, r) => s + r.stars * r.count, 0) / totalReviews
).toFixed(1);

const StarRow = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={12}
        className={s <= rating ? "text-amber-400" : "text-gray-200"}
        fill="currentColor"
      />
    ))}
  </div>
);

const reviewColumns: ColumnDef<ProductReview>[] = [
  {
    accessorKey: "customer",
    header: () => <App_Text variant="tableHeader">Customer</App_Text>,
    cell: ({ row }) => {
      const customer = row.original.customer;
      return (
        <div className="flex items-center gap-2 min-w-[140px]">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-[#f0e8df] flex-shrink-0">
            <Image
              src={customer.avatar}
              alt={customer.name}
              width={28}
              height={28}
              className="w-full h-full object-cover"
            />
          </div>
          <App_Text variant="tableCell" className="font-medium">
            {customer.name}
          </App_Text>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: () => <App_Text variant="tableHeader">Rating</App_Text>,
    cell: ({ row }) => <StarRow rating={row.getValue("rating")} />,
  },
  {
    accessorKey: "review",
    header: () => <App_Text variant="tableHeader">Review</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted" className="max-w-[200px] truncate">
        {row.getValue("review")}
      </App_Text>
    ),
  },
  {
    accessorKey: "date",
    header: () => <App_Text variant="tableHeader">Date</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("date")}</App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const status = row.getValue("status") as ReviewStatus;
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${reviewStatusStyles[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-[#f5f2ee] text-muted-foreground transition-colors"
          >
            <MoreHorizontal size={15} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem className="text-xs cursor-pointer">
            Publish
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs cursor-pointer">
            Reject
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs cursor-pointer text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const Tab_Reviews = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <App_Text variant="cardHeading">Product Reviews</App_Text>
          <App_Text variant="tableCellMuted" className="mt-0.5">
            Manage customer reviews and ratings.
          </App_Text>
        </div>
        <App_Button
          text="Add Review"
          type="button"
          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
        />
      </div>

      {/* Rating summary */}
      <div className="flex flex-col sm:flex-row gap-6 bg-[#faf9f7] rounded-2xl border border-[#ede8e2] p-5">
        {/* Average */}
        <div className="flex flex-col items-center justify-center flex-shrink-0 gap-1">
          <span className="text-5xl font-bold text-[text] leading-none">
            {averageRating}
          </span>
          <StarRow rating={Math.round(Number(averageRating))} />
          <App_Text variant="tableCellMuted">({totalReviews} reviews)</App_Text>
        </div>

        {/* Divider */}
        <div className="w-px bg-[#ede8e2] hidden sm:block" />

        {/* Breakdown */}
        <div className="flex flex-col gap-2 flex-1 justify-center">
          {ratingBreakdown.map(({ stars, count }) => {
            const pct = Math.round((count / totalReviews) * 100);
            return (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-10 flex-shrink-0">
                  <Star
                    size={11}
                    className="text-amber-400"
                    fill="currentColor"
                  />
                  <App_Text variant="tableCellMuted">{stars}</App_Text>
                </div>
                <div className="flex-1 h-2 bg-[#ede8e2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <App_Text variant="tableCellMuted" className="w-20 text-right">
                  {count} ({pct}%)
                </App_Text>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews table */}
      <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
        <App_Table
          columns={reviewColumns}
          data={productReviews}
          style="mt-0"
          childRowStyle="hover:bg-[#faf9f7]"
        />
      </div>
    </div>
  );
};

export default Tab_Reviews;
