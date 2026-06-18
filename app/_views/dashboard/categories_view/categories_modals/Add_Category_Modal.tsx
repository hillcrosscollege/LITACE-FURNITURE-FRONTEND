"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import {
  categoriesList,
  categoryDetail,
} from "../categories_data/categories_data";
import { CategoryForm } from "../categories_types";
import App_Modal from "@/components/app_ui/App_Modal";
import { useCategoryContext } from "@/app/contexts/admin/Category_Context";

type Props = {
  mode?: "add" | "edit";
};

const Add_Category_Modal = ({ mode = "add" }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  // const [completed, setCompleted] = useState<number[]>(
  //   mode === "edit" ? [1, 2] : [],
  // );
  const defaultValues: Partial<CategoryForm> = {
    name: categoryDetail.name,
    description: categoryDetail.description,
    status: categoryDetail.status === "Active",
    urlSlug: categoryDetail.slug,
  };

  const { setShowEdit, setShowAdd } = useCategoryContext();

  const onClose = () => {
    mode == "edit" ? setShowEdit(false) : setShowAdd(false);
  };

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CategoryForm>({
    defaultValues: {
      status: true,
      ...defaultValues,
    },
  });

  const statusValue = watch("status");

  const onSubmit = (data: CategoryForm) => {
    onClose();
  };

  return (
    <App_Modal
      onClose={onClose}
      text={mode === "add" ? "Add Category" : "Edit Category"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Category Name <span className="text-[#c0392b]">*</span>
            </label>
            <App_Input
              name="name"
              register={register}
              errors={errors}
              placeholder="Enter category name"
              showLabel={false}
              rules={{ required: "Category name is required" }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Parent Category</label>
            <select
              {...register("parentCategory")}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary"
            >
              <option value="">Select parent category (optional)</option>
              {categoriesList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter category description"
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-[#ede8e2] bg-[#faf9f7]">
            <div>
              <App_Text variant="tableCell" className="font-medium">
                Status
              </App_Text>
              <App_Text variant="tableCellMuted">
                {statusValue ? "Active" : "Inactive"}
              </App_Text>
            </div>
            <button
              type="button"
              onClick={() => setValue("status", !statusValue)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                statusValue ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  statusValue ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-[#ede8e2]">
          <App_Button
            text="Cancel"
            type="button"
            onPress={onClose}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
          />
          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <App_Button
                text="Back"
                type="button"
                onPress={() => setCurrentStep((s) => s - 1)}
                btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
              />
            )}
            <App_Button
              text={mode === "add" ? "Add Category" : "Save Changes"}
              type="submit"
              btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
            />
          </div>
        </div>
      </form>
    </App_Modal>
  );
};

export default Add_Category_Modal;
