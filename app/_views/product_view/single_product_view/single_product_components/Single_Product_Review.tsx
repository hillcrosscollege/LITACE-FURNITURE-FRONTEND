// components/product/Product_Reviews.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";

// types/reviews.ts
export type Review = {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
};

export const reviews: Review[] = [
  {
    id: "1",
    author: "Obayedul",
    avatar: "/conference_chair-2.png",
    date: "13 Oct 2024",
    rating: 4,
    comment:
      "Loose-fit sweatshirt hoodie in medium weight cotton-blend fabric with a generous, but not oversized silhouette. Jersey-lined, drawstring hood, dropped shoulders, long sleeves.",
  },
  {
    id: "2",
    author: "Jane Smith",
    avatar: "/conference_chair-2.png",
    date: "10 Oct 2024",
    rating: 5,
    comment:
      "Absolutely love this chair. The craftsmanship is outstanding and it fits perfectly in my living room. Delivery was smooth and well packaged.",
  },
  {
    id: "3",
    author: "Michael Brown",
    avatar: "/conference_chair-2.png",
    date: "5 Oct 2024",
    rating: 5,
    comment:
      "Worth every penny. The birch frame is solid and the cushions are incredibly comfortable. Already recommended to three friends.",
  },
  {
    id: "4",
    author: "Emily Davis",
    avatar: "/conference_chair-2.png",
    date: "1 Oct 2024",
    rating: 3,
    comment:
      "Good quality overall but delivery took longer than expected. The colour was slightly different from the website photos.",
  },
];

export const ratingBreakdown = [
  { stars: 5, count: 28 },
  { stars: 4, count: 12 },
  { stars: 3, count: 6 },
  { stars: 2, count: 3 },
  { stars: 1, count: 1 },
];

export const averageRating = 4.5;
export const totalReviews = 50;

const StarRow = ({ rating, size = 16 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={size}
        className={s <= rating ? "text-amber-400" : "text-gray-200"}
        fill={s <= rating ? "currentColor" : "currentColor"}
      />
    ))}
  </div>
);

const VISIBLE = 2;

const Single_Product_Reviews = () => {
  const [visibleCount, setVisibleCount] = useState(VISIBLE);
  const [activeSlide, setActiveSlide] = useState(0);

  const visibleReviews = reviews.slice(0, visibleCount);
  const totalStars = ratingBreakdown.reduce((s, r) => s + r.count, 0);

  return (
    <section className="my-16">
      <App_Text variant="heading" className="mb-8">
        Rating & Reviews
      </App_Text>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* ── Left: average + breakdown ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="shrink-0 w-full lg:w-[40%] flex gap-4"
        >
          <div>
            {/* Big number */}
            <div className="flex items-end gap-2 mb-2">
              <span className="text-8xl font-bold text-black leading-none">
                {averageRating}
              </span>
              <span className="text-2xl text-muted-foreground mb-3">/5</span>
            </div>
            <App_Text variant="tableCellMuted" className="mb-4">
              ({totalReviews} New Reviews)
            </App_Text>
          </div>

          {/* Breakdown bars */}
          <div className="flex flex-1 flex-wrap gap-2">
            {ratingBreakdown.map(({ stars, count }) => {
              const pct = Math.round((count / totalStars) * 100);
              return (
                <div key={stars} className="flex w-full items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <Star
                      size={16}
                      className="text-amber-400"
                      fill="currentColor"
                    />
                    <span className="text-[11px] lg:text-base text-muted">
                      {stars}
                    </span>
                  </div>
                  <div className="flex-1 h-1.5 bg-gray-400 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 * (5 - stars) }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Right: review cards ── */}
        <div className="flex-1 flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {visibleReviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-[#ede8e2] rounded-2xl p-5 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#f0e8df] flex-shrink-0">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <App_Text variant="tableCell" className="font-semibold">
                      {review.author}
                    </App_Text>
                  </div>
                  <App_Text variant="tableCellMuted">{review.date}</App_Text>
                </div>

                {/* Stars */}
                <StarRow rating={review.rating} size={14} />

                {/* Comment */}
                <App_Text
                  variant="body"
                  className="text-sm text-muted-foreground mt-3 leading-relaxed"
                >
                  "{review.comment}"
                </App_Text>

                {/* Slide indicator dots (decorative, matching screenshot) */}
                <div className="flex items-center gap-1 mt-4">
                  {[0, 1, 2].map((dot) => (
                    <button
                      key={dot}
                      type="button"
                      onClick={() => setActiveSlide(dot)}
                      className={`h-1 rounded-full transition-all ${
                        activeSlide === dot
                          ? "w-6 bg-[text]"
                          : "w-2 bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Load more */}
          {visibleCount < reviews.length && (
            <App_Button
              text="Load more reviews"
              onPress={() => setVisibleCount((c) => c + VISIBLE)}
              btnStyle="self-start text-sm border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-xl px-5 py-2.5 h-auto"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Single_Product_Reviews;
