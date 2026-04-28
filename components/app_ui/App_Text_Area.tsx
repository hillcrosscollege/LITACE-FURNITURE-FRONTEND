import {
  FieldErrors,
  UseFormRegister,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

interface IAppTextarea<T extends Record<string, any>> {
  name: Path<T>;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  className?: string;
  placeholder?: string;
  containerStyle?: string;
}

const App_Text_Area = <T extends Record<string, any>>({
  errors,
  register,
  name,
  rules,
  className,
  placeholder,
  containerStyle,
}: IAppTextarea<T>) => {
  return (
    <div className={`${cn("flex-1", containerStyle)}`}>
      <Textarea
        placeholder={placeholder ?? String(name)}
        className={cn(
          "min-h-30 rounded-lg border-muted resize-none",
          className,
        )}
        {...register(name, rules)}
      />

      {errors[name] && (
        <p className="text-sm text-destructive mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default App_Text_Area;
