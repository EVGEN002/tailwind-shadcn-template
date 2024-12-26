import { ChangeEventHandler } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

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
    // <div className="space-y-1.5">
    <div className="grid grid-cols-3 gap-2">
      <Label className="font-medium col-span-1">{label}</Label>
      <Input
        className={cn('col-span-2', className)}
        readOnly={readOnly}
        type="number"
        step={1}
        min={1}
        value={value ?? undefined}
        onChange={onChange}
      ></Input>
    </div>
  );
};

export default BaseItemNumber;
