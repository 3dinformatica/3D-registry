"use client";

import * as React from "react";
import { CircleCheck, CircleX } from "lucide-react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const booleanIconVariants = cva("", {
  variants: {
    size: {
      sm: "size-4",
      base: "size-5",
      lg: "size-6",
    },
    variant: {
      success: "text-green-500",
      error: "text-red-500",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export interface BooleanIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof booleanIconVariants> {
  value?: boolean | null | undefined;
  showFallback?: boolean;
  fallbackText?: string;
}

function BooleanIcon({
  value,
  size,
  variant,
  className,
  showFallback = true,
  fallbackText = "-",
  ...props
}: BooleanIconProps) {
  if (value === undefined || value === null) {
    if (!showFallback) return null;
    return (
      <span
        className={cn("text-muted-foreground", className)}
        data-slot="boolean-icon-fallback"
        {...props}
      >
        {fallbackText}
      </span>
    );
  }

  const iconVariant = value ? variant || "success" : variant || "error";

  return value ? (
    <CircleCheck
      data-slot="boolean-icon-success"
      className={cn(
        booleanIconVariants({ size, variant: iconVariant }),
        className
      )}
    />
  ) : (
    <CircleX
      data-slot="boolean-icon-error"
      className={cn(
        booleanIconVariants({ size, variant: iconVariant }),
        className
      )}
    />
  );
}

export { BooleanIcon, booleanIconVariants };
