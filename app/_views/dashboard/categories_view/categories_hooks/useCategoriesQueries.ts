"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "../categories_data/categories_data";

export const CATEGORY_KEYS = {
  all: ["categories"] as const,
  lists: () => [...CATEGORY_KEYS.all, "list"] as const,
  detail: (id: string) => [...CATEGORY_KEYS.all, "detail", id] as const,
};

// ── Queries ──────────────────────────────────────────────
export const useCategoriesQuery = () =>
  useQuery({
    queryKey: CATEGORY_KEYS.lists(),
    queryFn: categoriesApi.getCategories,
  });

export const useCategoryDetail = (id: string) =>
  useQuery({
    queryKey: CATEGORY_KEYS.detail(id),
    queryFn: () => categoriesApi.getCategoryById(id),
    enabled: !!id,
  });
