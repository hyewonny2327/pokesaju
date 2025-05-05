"use client";
interface InputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({ value, placeholder, onChange }: InputProps) {
  return (
    <input
      className="px-4 py-4 border"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    />
  );
}
export default Input;
