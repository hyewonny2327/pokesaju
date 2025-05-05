import { SelectOption } from "@custom-types/SelectOption";

interface SelectProps {
  label?: string;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: string;
}

function Select({ label, options, onChange, checked }: SelectProps) {
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
            checked={option.id === checked}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}
export default Select;
