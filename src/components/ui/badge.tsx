import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'subtle';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 font-medium select-none',
        variant === 'default' && 'bg-[#171717] text-[#FFFFFF]',
        variant === 'outline' && 'border border-[#E5E5E5] text-[#171717]',
        variant === 'subtle' && 'bg-[#F5F5F5] text-[#525252]',
        className,
      )}
      {...props}
    />
  );
}

export function Separator({ className, orientation = 'horizontal' }: { className?: string; orientation?: 'horizontal' | 'vertical' }) {
  return (
    <div
      className={cn(
        'bg-[#E5E5E5]',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full',
        className,
      )}
      role="separator"
    />
  );
}
