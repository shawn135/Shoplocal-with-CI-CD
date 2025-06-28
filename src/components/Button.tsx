import React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
