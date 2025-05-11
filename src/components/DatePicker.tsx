"use client";

import { SAJU_MIN_DATE } from "@constants/date";
import { formatCurrentDateTime } from "@utils/dateUtils";
interface DatePickerProps {
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function DatePicker({ value, label, onChange }: DatePickerProps) {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <label
        htmlFor="birth"
        className="text-xs font-mono tracking-widest text-gray-600 uppercase"
      >
        {label}
      </label>
      <input
        className="w-full px-4 py-2 bg-white border-2 border-black rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm font-mono tracking-wide text-gray-700"
        type="datetime-local"
        id="birth"
        name="birth"
        value={value}
        onChange={(e) => onChange(e)}
        min={`${SAJU_MIN_DATE}T00:00`}
        max={formatCurrentDateTime()}
      />
    </div>
  );
}

export default DatePicker;
