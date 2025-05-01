import type { SelectOption } from "@custom-types/SelectOption.ts";

interface SelectProps {
  label?: string;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Select({ label, options, onChange }: SelectProps) {
  return (
    <div className="flex flex-row gap-4">
      {label && <label>{label}</label>}
      {options.map((option) => (
        <div className="flex flex-row">
          <input
            type="radio"
            key={option.id}
            id={option.id}
            name={option.name}
            value={option.value}
            checked={option.checked}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}
export default Select;
