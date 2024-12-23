import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';

interface BaseLabelProps {
  label: string;
  children: ReactNode;
}

const BaseLabel = ({ label, children }: BaseLabelProps) => {
  return (
    <div className='grid grid-cols-3 gap-2'>
    {/* <div className='space-y-1.5'> */}
      <Label className='col-span-1'>{label}</Label>
      <div className='col-span-2'>
        {children}
      </div>
    </div>
  );
};

export default BaseLabel;
