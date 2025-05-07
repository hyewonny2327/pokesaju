import { SelectOption } from "@custom-types/SelectOption";

interface SelectProps {
  label?: string;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: string;
}

function Select({ label, options, onChange, checked }: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <input
              type="radio"
              id={option.id}
              name={option.name}
              value={option.value}
              checked={option.id === checked}
              onChange={onChange}
              className="accent-blue-500 w-4 h-4"
            />
            <label htmlFor={option.id} className="text-sm text-gray-800">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Select;
