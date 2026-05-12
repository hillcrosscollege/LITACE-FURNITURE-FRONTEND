"use client";
import { Button } from "@/components/ui/button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { useContactForm } from "../contact_hook.tsx/useContactForm";
import App_Header_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";

const Contact_Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
  } = useContactForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 lg:w-[45%] bg-white p-6 rounded-lg flex flex-col shadow-md"
    >
      <App_Header_Text
        children="Send us an email"
        variant="cardTitle"
        className="font-semibold text-primary"
      />
      <App_Input
        name="FullName"
        register={register}
        errors={errors}
        rules={{
          required: "Name is required",
        }}
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
        name="Message"
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
        text="Send Message"
        type="submit"
        btnStyle="w-full text-white py-6"
      />
    </form>
  );
};

export default Contact_Form;
