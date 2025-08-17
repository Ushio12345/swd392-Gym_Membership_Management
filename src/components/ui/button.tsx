import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border border-border bg-accent-blue text-text-primary hover:bg-primary hover:text-text",
        outline:
          "border border-border bg-background hover:bg-accent-blue/10 hover:text-text-primary",
        outline_primary:
          "border-2 border-primary font-semibold text-primary hover:bg-accent-blue/10 hover:text-text-primary",
        secondary:
          "bg-gradient-to-r from-primary to-secondary text-text font-semibold hover:opacity-90",
        dashed:
          "border border-dashed border-border bg-transparent text-text-secondary hover:bg-accent-blue/10",
        icon: "hover:text-primary [&_svg]:size-5 justify-start hover:bg-accent-blue/10",
        outline_grey:
          "border-2 border-border text-text-muted font-semibold hover:bg-accent-blue/10",
        select_btn:
          "border bg-secondary text-text-primary font-semibold hover:opacity-80",
        destructive:
          "bg-accent-error text-text shadow-sm hover:bg-accent-error/80 focus-visible:ring-accent-error/30",
        ghost:
          "bg-transparent text-primary hover:bg-accent-blue/10 font-medium",
      },
      size: {
        default: "h-10 px-4 py-3",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function getComponentWithType(asChild: boolean) {
  return asChild ? Slot : "button";
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isUseVariant?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      isUseVariant = true,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = getComponentWithType(asChild);

    const computedClassName = isUseVariant
      ? buttonVariants({ variant, size, className })
      : cn(className);

    return <Comp className={computedClassName} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
