import type { FC } from 'react';
import { Flex } from '@forgedevstack/bear';

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const ToggleRow: FC<ToggleRowProps> = (props) => {
  const { label, checked, onChange } = props;

  return (
    <Flex justify="between" align="center" className="py-1.5">
      <span className="text-sm text-slate-700">{label}</span>
      <button
        type="button"
        className="ink-toggle"
        data-on={checked ? 'true' : 'false'}
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
      >
        <span className="ink-toggle__knob" />
      </button>
    </Flex>
  );
};
