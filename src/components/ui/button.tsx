import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sg-red focus-visible:ring-offset-2 focus-visible:ring-offset-sg-black disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-sg-red text-white hover:bg-sg-red-bright hover:shadow-[0_8px_30px_-6px_rgba(224,20,44,0.6)]",
        outline:
          "border border-sg-line text-sg-ink hover:border-sg-red hover:text-white bg-transparent",
        light:
          "border border-sg-line-light text-sg-dark-ink hover:border-sg-red hover:text-sg-red bg-transparent",
        ghost: "text-sg-ink hover:text-sg-red-bright",
        white: "bg-white text-sg-black hover:bg-sg-paper-2",
      },
      size: {
        default: "h-11 px-6 rounded-full",
        sm: "h-9 px-4 rounded-full text-xs",
        lg: "h-13 px-8 rounded-full text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
