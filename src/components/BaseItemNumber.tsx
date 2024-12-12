import { ChangeEventHandler } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface BaseItemProps {
  className?: string;
  label: string;
  value: number | undefined | null;
  onChange: ChangeEventHandler<HTMLInputElement>;
  readOnly?: boolean;
}

const BaseItemNumber = ({
  label,
  value,
  onChange,
  className,
  readOnly
}: BaseItemProps) => {
  return (
    <div className="space-y-1.5">
      <Label className="font-medium">{label}</Label>
      <Input
        className={className}
        readOnly={readOnly}
        type="number"
        value={value ?? undefined}
        onChange={onChange}
      ></Input>
    </div>
  );
};

export default BaseItemNumber;
