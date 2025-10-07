interface FormWrapperProps {
  children: React.ReactNode;
}

export function FormWrapper({ children }: FormWrapperProps) {
  return <div className='space-y-4'>{children}</div>;
}
