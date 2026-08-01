import type { FC } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectRowProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export const SelectRow: FC<SelectRowProps> = (props) => {
  const { label, value, options, onChange } = props;

  return (
    <div className="py-1.5">
      <span className="text-sm block mb-1.5 text-slate-700">{label}</span>
      <select
        className="ink-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
