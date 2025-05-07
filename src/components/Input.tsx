"use client";
interface InputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({ value, placeholder, onChange }: InputProps) {
  return (
    <input
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    />
  );
}
export default Input;
