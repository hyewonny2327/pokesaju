"use client";

import { formatCurrentDateTime } from "@utils/formatCurrentDateTime";
interface DatePickerProps {
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function DatePicker({ value, label, onChange }: DatePickerProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="birth">{label}</label>
      <input
        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
        type="datetime-local"
        id="birth"
        name="birth"
        value={value}
        onChange={(e) => onChange(e)}
        min="1930-01-01T00:00"
        max={formatCurrentDateTime()}
      />
      ;
    </div>
  );
}

export default DatePicker;
