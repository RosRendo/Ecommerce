import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] uppercase tracking-[0.15em] text-[#525252] font-normal"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-12 w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2 text-sm text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:outline-none transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40',
            error && 'border-[#171717]',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-[11px] text-[#525252] mt-1">{error}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
