"use client";

import { Checkbox } from "@/components/ui/checkbox";

const App_CheckBox = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => onChange(!!val)}
        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};

export default App_CheckBox;
