"use client";

type Props = {
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
};

const Settings_Toggle = ({ value, onChange, disabled }: Props) => (
  <button
    type="button"
    onClick={() => !disabled && onChange(!value)}
    disabled={disabled}
    className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
      value ? "bg-primary" : "bg-gray-200"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <span
      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
        value ? "translate-x-5" : "translate-x-0.5"
      }`}
    />
  </button>
);

export default Settings_Toggle;
