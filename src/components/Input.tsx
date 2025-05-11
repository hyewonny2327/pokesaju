"use client";
interface InputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({ value, placeholder, onChange }: InputProps) {
  return (
    <input
      className="w-full px-4 py-2 bg-white border-2 border-black rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm font-mono tracking-wide placeholder:text-gray-400"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    />
  );
}
export default Input;
