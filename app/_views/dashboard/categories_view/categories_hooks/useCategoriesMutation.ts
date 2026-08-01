import { useQueryClient, useMutation } from "@tanstack/react-query";
import { categoriesApi } from "../categories_data/categories_data";
import {
  AddCategoryPayload,
  ReorderPayload,
  CategorySEO,
} from "../categories_types";
import { CATEGORY_KEYS } from "./useCategoriesQueries";

// ── Mutations ─────────────────────────────────────────────
export const useAddCategory = (onClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddCategoryPayload) =>
      categoriesApi.addCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.lists() });
      onClose();
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<AddCategoryPayload>;
    }) => categoriesApi.updateCategory(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.detail(id) });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      reassign,
      targetId,
    }: {
      id: string;
      reassign: boolean;
      targetId?: string;
    }) => categoriesApi.deleteCategory(id, reassign, targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.lists() });
    },
  });
};

// export const useReorderCategories = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: ReorderPayload) =>
//       categoriesApi.reorderCategories(payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.lists() });
//     },
//   });
// };

export const useExportCategories = () =>
  useMutation({
    mutationFn: ({
      format,
      includes,
    }: {
      format: string;
      includes: string[];
    }) => categoriesApi.exportCategories(format, includes),
  });

export const useUpdateCategorySEO = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, seo }: { id: string; seo: CategorySEO }) =>
      categoriesApi.updateSEO(id, seo),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.detail(id) });
    },
  });
};

export const useAddSubcategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId, name }: { categoryId: string; name: string }) =>
      categoriesApi.addSubcategory(categoryId, name),
    onSuccess: (_, { categoryId }) => {
      queryClient.invalidateQueries({
        queryKey: CATEGORY_KEYS.detail(categoryId),
      });
    },
  });
};

export const useDeleteSubcategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoriesApi.deleteSubcategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all });
    },
  });
};

export const useAddCategoryMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId, file }: { categoryId: string; file: File }) =>
      categoriesApi.addMedia(categoryId, file),
    onSuccess: (_, { categoryId }) => {
      queryClient.invalidateQueries({
        queryKey: CATEGORY_KEYS.detail(categoryId),
      });
    },
  });
};

export const useDeleteCategoryMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      categoryId,
      mediaId,
    }: {
      categoryId: string;
      mediaId: string;
    }) => categoriesApi.deleteMedia(categoryId, mediaId),
    onSuccess: (_, { categoryId }) => {
      queryClient.invalidateQueries({
        queryKey: CATEGORY_KEYS.detail(categoryId),
      });
    },
  });
};
