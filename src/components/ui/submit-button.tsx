import {Button, ButtonProps} from "@/components/ui/button";
import React from "react";
import {cn} from "@lib/utils";

interface SubmitButtonProps extends ButtonProps {
  title?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  loadingTitle?: string;
}

export default function SubmitButton(
  {
    title,
    icon,
    loading = false,
    loadingTitle = title,
    className,
    ...props
  }: SubmitButtonProps
) {
  return (
    <Button
      variant="secondary"
      className={cn("hover:opacity-90 transition-all duration-300 flex items-center justify-center", className)}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" fill="none"
               viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
          <span className="ml-2">{loadingTitle}</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          <span>{title}</span>
        </>
      )}
    </Button>
  );
}