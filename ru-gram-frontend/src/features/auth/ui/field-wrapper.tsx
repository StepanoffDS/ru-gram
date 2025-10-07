import { Label } from '@/shared/components/ui/label';

interface FieldWrapperProps {
  label: string | React.ReactNode;
  name?: string;
  children: React.ReactNode;
}

export function FieldWrapper({ label, name, children }: FieldWrapperProps) {
  return (
    <div className='grid gap-2'>
      {typeof label === 'string' ? (
        <Label htmlFor={name}>{label}</Label>
      ) : (
        label
      )}
      {children}
    </div>
  );
}
