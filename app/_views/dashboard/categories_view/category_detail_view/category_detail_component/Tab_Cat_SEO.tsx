// components/categories/details/tabs/Tab_Cat_SEO.tsx
"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import { useForm } from "react-hook-form";
import { categorySEO } from "../../categories_data/categories_data";
import { CategorySEO } from "../../categories_types";

const Tab_Cat_SEO = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CategorySEO>({
    defaultValues: categorySEO,
  });

  const metaDesc = watch("metaDescription") ?? "";

  const onSubmit = (data: CategorySEO) => console.log("SEO saved:", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
      <App_Text variant="cardHeading">SEO Settings</App_Text>

      {/* Live preview */}
      <div className="bg-white rounded-xl border border-[#ede8e2] p-4 space-y-1">
        <App_Text
          variant="tableCellMuted"
          className="text-[10px] uppercase tracking-wider mb-2"
        >
          Search Preview
        </App_Text>
        <App_Text
          variant="tableCell"
          className="text-blue-600 font-medium truncate"
        >
          {watch("metaTitle") || "Meta Title"}
        </App_Text>
        <App_Text variant="tableCellMuted">
          furnicasa.com/{watch("urlSlug") || "category-slug"}
        </App_Text>
        <App_Text variant="tableCellMuted" className="text-xs line-clamp-2">
          {watch("metaDescription") || "Meta description will appear here..."}
        </App_Text>
      </div>

      <App_Input
        name="metaTitle"
        register={register}
        errors={errors}
        placeholder="Enter meta title"
      />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Meta Description</label>
          <App_Text
            variant="tableCellMuted"
            className={metaDesc.length > 160 ? "text-[#c0392b]" : ""}
          >
            {metaDesc.length}/160
          </App_Text>
        </div>
        <textarea
          {...register("metaDescription")}
          rows={3}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary resize-none"
        />
      </div>

      <App_Input
        name="metaKeywords"
        register={register}
        errors={errors}
        placeholder="keyword1, keyword2"
      />
      <App_Input
        name="urlSlug"
        register={register}
        errors={errors}
        placeholder="category-url-slug"
      />

      <div className="flex justify-end pt-2">
        <App_Button
          text="Save Changes"
          type="submit"
          btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
        />
      </div>
    </form>
  );
};

export default Tab_Cat_SEO;
