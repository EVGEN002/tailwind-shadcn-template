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

const TextareaItem = ({ label, placeholder, value, onChange, readOnly }: TextareaItemProps) => {
  return (
    <div className='space-y-1.5'>
      <Label className="font-medium">{label}</Label>
      <Textarea readOnly={readOnly} value={value} placeholder={placeholder} onChange={onChange}></Textarea>
    </div>
  );
};

export default TextareaItem;
