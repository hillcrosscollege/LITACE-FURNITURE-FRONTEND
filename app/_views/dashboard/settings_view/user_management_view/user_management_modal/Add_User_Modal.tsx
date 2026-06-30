"use client";

import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import { useAddUser } from "../user_management_hooks/useUserManagementMutations";
import { Role, AddUserPayload } from "../user_management_types";

type Props = { roles: Role[]; onClose: () => void };

const Add_User_Modal = ({ roles, onClose }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: addUser, isPending } = useAddUser();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddUserPayload>({
    defaultValues: { status: true },
  });

  const roleValue = watch("roleId") ?? "";
  const statusValue = watch("status");

  const roleOptions = roles.map((r) => ({ label: r.name, key: r.id }));

  const onSubmit = (data: AddUserPayload) =>
    addUser(data, { onSuccess: onClose });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Add User
          </App_Text>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <App_Input
            name="fullName"
            register={register}
            errors={errors}
            placeholder="Enter full name"
            rules={{ required: "Full name is required" }}
          />
          <App_Input
            name="email"
            register={register}
            errors={errors}
            placeholder="Enter email address"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            }}
          />

          <App_Select
            data={roleOptions}
            value={roleValue}
            placeholder="Select role"
            title="Role"
            onChange={(val) => setValue("roleId", val)}
            style="gap-1.5"
          />

          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Password
            </App_Text>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Min 8 characters" },
                })}
                placeholder="Enter password"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 pr-9 bg-white outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <App_Text variant="tableCell" className="font-medium">
              Status
            </App_Text>
            <button
              type="button"
              onClick={() => setValue("status", !statusValue)}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${statusValue ? "bg-primary" : "bg-gray-200"}`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${statusValue ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </button>
          </div>

          <div className="flex gap-3 pt-1">
            <App_Button
              text="Cancel"
              type="button"
              onPress={onClose}
              btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
            />
            <App_Button
              text={isPending ? "Adding..." : "Add User"}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_User_Modal;
