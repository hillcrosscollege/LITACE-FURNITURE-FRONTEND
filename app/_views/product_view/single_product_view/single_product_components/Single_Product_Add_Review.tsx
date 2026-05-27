"use client";
import App_Button from "@/components/app_ui/App_Button";
import App_Header_Text from "@/components/app_ui/App_Text";
import App_Input from "@/components/app_ui/App_Input";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import App_Double_Text from "@/components/shared/App_Double_Text";
import { useSingleProductReviewForm } from "../single_product_review_hook.tsx/useSingleProductReviewForm";

const Single_Product_Add_Review = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
  } = useSingleProductReviewForm();
  return (
    <div className="flex flex-col gap-8 w-[70%]">
      <App_Header_Text children="Customer Review" variant="sectionTitle" />
      <div className="grid-cols-2 gap-8 grid">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex gap-2">
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-primary text-white">
              RE
            </div>
            <div className="flex-1">
              <App_Double_Text
                className="gap-y-0"
                header={{ children: "User Name", variant: "cardHeading" }}
                para={{
                  children: "2026-04-12",
                  className: "text-xs lg:text-sm",
                }}
              />
              <p className="w-[90%] text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae,
                adipisci aliquid? Eos quas repellendus dicta alias eius impedit
                consequuntur commodi!
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <App_Header_Text children="Leave A Review" variant="sectionTitle" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-8 grid gap-4"
      >
        <App_Input
          name="FullName"
          register={register}
          errors={errors}
          rules={{
            required: "Name is required",
          }}
          className="bg-gray-200 px-2"
        />
        <App_Input
          name="Email"
          register={register}
          errors={errors}
          rules={{
            required: "Email is required",
          }}
        />
        <App_Text_Area
          name="Review"
          register={register}
          errors={errors}
          placeholder="Type your message..."
          className="h-full"
          rules={{
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message too short",
            },
          }}
        />
        <App_Button
          text="Send Review"
          type="submit"
          btnStyle="w-full text-white py-6"
        />
      </form> */}
    </div>
  );
};

export default Single_Product_Add_Review;
