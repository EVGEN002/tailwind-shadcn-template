import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';

interface BaseLabelProps {
  label: string;
  children: ReactNode;
}

const BaseLabel = ({ label, children }: BaseLabelProps) => {
  return (
    <div className='space-y-1.5'>
      <Label>{label}</Label>
      {children}
    </div>
  );
};

export default BaseLabel;
