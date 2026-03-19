import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "success" | "warning" | "error" | "outline" }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-gray-100 text-gray-800 border border-gray-200/50": variant === "default",
          "bg-emerald-50 text-emerald-700 border border-emerald-200/50": variant === "success",
          "bg-amber-50 text-amber-700 border border-amber-200/50": variant === "warning",
          "bg-red-50 text-red-700 border border-red-200/50": variant === "error",
          "border border-gray-200 text-gray-800 bg-white/50": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
