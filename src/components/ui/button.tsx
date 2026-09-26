import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-30 cursor-pointer select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[#000000] text-[#FFFFFF] hover:bg-[#171717] active:bg-[#525252]',
        secondary:
          'bg-[#FFFFFF] text-[#000000] border border-[#E5E5E5] hover:border-[#000000] hover:bg-[#FAFAFA]',
        outline:
          'border border-[#E5E5E5] text-[#000000] hover:border-[#000000]',
        ghost:
          'text-[#000000] hover:text-[#525252] hover:bg-[#F5F5F5]',
        link:
          'text-[#000000] underline-offset-4 hover:underline p-0 h-auto font-normal normal-case tracking-normal',
        quiet:
          'text-[#525252] hover:text-[#000000] transition-colors',
      },
      size: {
        default: 'h-12 px-7 py-3',
        sm: 'h-9 px-4 py-2 text-[10px]',
        lg: 'h-14 px-10 py-4 text-xs',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
