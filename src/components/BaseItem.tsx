import { ChangeEventHandler } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

interface BaseItemProps {
  label: string;
  value: string | undefined | null;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  readOnly?: boolean;
}

const BaseItem = ({ label, value, onChange, className, readOnly }: BaseItemProps) => {
  return (
    <div className='space-y-1.5'>
      <Label className="font-medium">{label}</Label>
      <Input
        className={cn(className)}
        readOnly={readOnly}
        type="text"
        value={value ?? ''}
        onChange={onChange}
      ></Input>
    </div>
  );
};

export default BaseItem;
