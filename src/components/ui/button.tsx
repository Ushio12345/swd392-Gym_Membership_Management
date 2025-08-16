import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border border-input bg-secondary text-foreground hover:bg-accent hover:bg-secondary",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        outline_primary:
          "border-2 border-secondary font-semibold text-secondary hover:bg-accent hover:bg-secondary-500 hover:text-foreground",
        secondary:
          "bg-gradient-primary text-white font-semibold hover:bg-gradient-primary hover:opacity-90 ",
        dashed:
          "border border-dashed border-gray-400 bg-transparent txt-secondary hover:bg-gray-100",
        icon: "hover:text-secondary [&_svg]:size-5 justify-start hover:bg-gray-100 ",
        outline_grey:
          "border-2 border-custom-bd-secondary text-custom-txt-primary font-semibold hover:bg-gray-100",
        select_btn:
          "border bg-gray-300 text-grey-800 font-semibold hover:brighness-50 hover:opacity-90 ",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 focus-visible:ring-red-500/30 dark:bg-red-500 dark:hover:bg-red-400 dark:focus-visible:ring-red-500/50",
        ghost: "bg-transparent text-secondary hover:bg-gray-100 font-medium",
      },
      size: {
        default: "h-9 px-4 py-2",
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
      ? buttonVariants({ variant, size, className }) // use variant-based styles
      : cn(className);

    return <Comp className={computedClassName} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
