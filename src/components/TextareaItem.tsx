import { ChangeEventHandler } from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface TextareaItemProps {
  label: string;
  value: string | undefined;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  readOnly?: boolean;
}

const TextareaItem = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly
}: TextareaItemProps) => {
  return (
    // <div className='space-y-1.5'>
    <div className="grid grid-cols-3 gap-2">
      <Label className="col-span-1 font-medium">{label}</Label>
      <Textarea
        className="col-span-2"
        readOnly={readOnly}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      ></Textarea>
    </div>
  );
};

export default TextareaItem;
